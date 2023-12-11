from abc import ABC, abstractmethod
from collections import namedtuple
from datetime import date
import os
from typing import Dict, List

import xlsxwriter
from quartal import Quartal

class ReportDataBlock(ABC):
  @abstractmethod
  def block_label(self) -> str:
    pass

  @abstractmethod
  def tables(self) -> Dict:
    pass
    
class QuartalMostActiveClientsBlock(ReportDataBlock):
  def __init__(self, quartal_clients: Dict[Quartal, List[int]]):
    self.quartal_clients = quartal_clients
    
  def block_label(self):
    return "Отчёт по активным клиентам"
  
  def tables(self):
    table = {}
    for quartal, clients_ids in self.quartal_clients.items():
      table.update({
        str(quartal) : clients_ids
      })
    return {"Топ клиентов по количеству платежей" : table}

class AreaStatsBlock(ReportDataBlock):
  def __init__(self, area_data: Dict[str, Dict[str, int]]):
    self.area_data = area_data

  def block_label(self):
    return "География клиентов"

  def tables(self):
    table = {}
    for country_name, country_data in self.area_data.items():
      table_view_country_data = {
        "Город" : [], 
        "Количество клиентов" : []
      }
      for city, clients_amount in country_data.items():
        table_view_country_data["Город"].append(city)
        table_view_country_data["Количество клиентов"].append(clients_amount)
      table.update({country_name : table_view_country_data})

    return { "Статистика распределения клиентов" : table }

class MaxMinBalanceBlock(ReportDataBlock):
  def __init__(self, debtors: Dict[int, int], profiteers: Dict[int, int]):
    self.debtors = debtors
    self.profiteers = profiteers

  def block_label(self):
    return "Анализ состояния счёта"

  def tables(self):
    table = {
      "Задолжности" : {
        "Клиент" : [],
        "Состояние счёта" : []
      }, 
      "Прибыльность" : {
        "Клиент" : [],
        "Состояние счёта" : []
      }
    }
    for client_id, debt in self.debtors.items():
      table["Задолжности"]["Клиент"].append(client_id)
      table["Задолжности"]["Состояние счёта"].append(debt)
    for client_id, profit in self.profiteers.items():
      table["Прибыльность"]["Клиент"].append(client_id)
      table["Прибыльность"]["Состояние счёта"].append(profit)
    return {"Статистика состояния счёта клиента" : table}

class ReportMetaBlock(ReportDataBlock):
  def __init__(self, dump_date: date, period_from: date, period_to: date):
    self.dump_date = dump_date
    self.period_from = period_from
    self.period_to = period_to

  def tables(self):
    return { "Дата выгрузки" : {  self.dump_date.strftime('%Y-%m-%d') : [] }, 
        "Период, за который сделана выгрузка" : { self.period_from.strftime('%Y-%m-%d') + " - " + self.period_to.strftime('%Y-%m-%d') : [] }
    }
  
  def block_label(self):
    return "Параметры запроса"

class XlsxReportWriter:

  block_label_format = {
    'bg_color' : '#FCD5B4',
    'font_color' : '#002060',
    'bold' : True,
    'font_size' : 14,
    'font' : 'Arial',
    'align': 'center', 
    'left' : 5,
    'top' : 5,
    'right' : 5,
    'bottom' : 5,
  }

  table_label_format = {
    'bold' : True,
    'bg_color' : '#C5D9F1',
    'font_size' : 10,
    'font' : 'Arial',
    'align': 'center', 
    'top' : 3,
    'bottom' : 3,
  }

  column_name_format = {
    'bg_color' : '#C5D9F1',
    'font_size' : 11,
    'font' : 'Arial',
    'align': 'center', 
    'left' : 3,
    'top' : 3,
    'right' : 3,
    'bottom' : 3,
  }

  data_format = {
    
  }

  def __init__(self, report_blocks: List[ReportDataBlock], row_padding: int):
    self.report_blocks = report_blocks
    self.row_padding = row_padding

  def create_file(self, filename):
    workbook = xlsxwriter.Workbook(os.path.join(os.path.dirname(os.path.abspath(__file__)), f"{filename}.xlsx"))
    block_label_format = workbook.add_format(XlsxReportWriter.block_label_format)
    table_label_format = workbook.add_format(XlsxReportWriter.table_label_format)
    column_name_format = workbook.add_format(XlsxReportWriter.column_name_format)
    data_format = workbook.add_format(XlsxReportWriter.data_format)
    worksheet = workbook.add_worksheet('analytics')
    worksheet.freeze_panes(0, 1)
    worksheet.set_column(0, 0, 50)
    worksheet.set_column(1, 100, 25)
    coords = namedtuple("Coords", ['row', 'col'])

    #приимает координаты ячейки, возвращает габариты того что напечатали
    def print_column(label: str, column_content, start_coords: coords) -> coords:
      if column_content == None:
        return coords(0, 0)
      if isinstance(column_content, list):
        up_padding = 0
        if not label == None:
          up_padding = 1
          worksheet.write(start_coords.row, start_coords.col, label, column_name_format)
        for i, data in enumerate(column_content):
          worksheet.write(start_coords.row + i + up_padding, start_coords.col, data, data_format)
        return coords(up_padding + len(column_content), 1)
      elif isinstance(column_content, dict):
        row = 0
        col = 0
        up_padding = 0
        if not label == None:
          up_padding = 1
        for subcolumn_name, subcolumn_content in column_content.items():
          taken = print_column(subcolumn_name, subcolumn_content, coords(start_coords.row + up_padding, start_coords.col + col))
          col += taken.col
          row = max(row, taken.row)
        if label is not None:
          if 1 < col:
            worksheet.merge_range(start_coords.row, start_coords.col, start_coords.row, start_coords.col + col - 1, label, column_name_format)
          else:
            worksheet.write(start_coords.row, start_coords.col, label, column_name_format)
        return coords(row, col)

    row = 0
    for block in self.report_blocks:
      worksheet.write(row, 0, block.block_label(), block_label_format)
      row += 1
      for table_name, table_content in block.tables().items():
        worksheet.write(row, 0, table_name, table_label_format)
        row += print_column(None, table_content, coords(row, 1)).row
      row += self.row_padding + 1
    workbook.close()

