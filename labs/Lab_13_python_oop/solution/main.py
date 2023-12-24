from collections import namedtuple
from datetime import datetime, date
import time
from persistence import CachedJsonFileClientDao, CachedJsonFilePaymentDao
from services import ClientService, PaymentService
from quartal import Quartal
from xlsx_report import AreaStatsBlock, MaxMinBalanceBlock, QuartalMostActiveClientsBlock, ReportMetaBlock, XlsxReportWriter

def convert_date(struct_time):
  return datetime.fromtimestamp(time.mktime(struct_time))

if __name__ == '__main__':

  payment_dao = CachedJsonFilePaymentDao("..\payments.json")
  client_dao = CachedJsonFileClientDao("..\clients.json")
  client_service = ClientService(payment_dao, client_dao)
  payment_service = PaymentService(payment_dao, client_dao)

  latest_payment_date = None
  oldest_payment_date = None
  for payment in payment_service.find_all():
    if (oldest_payment_date == None) or payment.created_at < oldest_payment_date:
      oldest_payment_date = payment.created_at
    if (latest_payment_date == None) or latest_payment_date < payment.created_at:
      latest_payment_date = payment.created_at

  report_meta_block = ReportMetaBlock(
    dump_date=date.today(), 
    period_from=oldest_payment_date.date(), 
    period_to=latest_payment_date.date()
  )
  
  quartal_payments = {}
  for payment in payment_service.find_all():
    quartal = Quartal(payment.created_at)
    quartal_payments.update({quartal : [payment] + quartal_payments.get(quartal, [])})
  quartal_clients = {}
  for quartal, payments in quartal_payments.items():
    clients_data = {}
    for payment in payments:
      clients_data.update({payment.client_id : 1 + clients_data.get(payment.client_id, 0)})
    quartal_clients.update({quartal : clients_data})
  for quartal in quartal_clients.keys():
    quartal_clients[quartal] = list(dict(sorted(quartal_clients[quartal].items(), key=lambda item: item[1], reverse=True)[:10]).keys())
  quartal_clients = dict(sorted(quartal_clients.items(), key=lambda item: item[0], reverse=True))

  quartal_most_active_clients_block = QuartalMostActiveClientsBlock(
    quartal_clients=quartal_clients
  )

  clients_areas = {}
  for client in client_service.find_all():
    clients_areas.update({ client.city : 1 + clients_areas.get(client.city, 0) })
  clients_areas = dict(sorted(clients_areas.items(), key=lambda item: item[1], reverse=True)[:10])

  area_stats_block = AreaStatsBlock(
    area_data={ "Russia" : clients_areas }
  )

  balances = {}
  for payment in payment_service.find_all():
    balances.update({ payment.client_id : payment.amount + balances.get(payment.client_id, 0) })
  profiteers = dict(sorted(balances.items(), key=lambda item: item[1], reverse=True)[:10])
  debtors = dict(sorted(balances.items(), key=lambda item: item[1], reverse=False)[:10])

  max_min_balance_block = MaxMinBalanceBlock(
    debtors=debtors,
    profiteers=profiteers
  )
  
  XlsxReportWriter(row_padding=1, report_blocks=[
    report_meta_block,
    quartal_most_active_clients_block,
    area_stats_block,
    max_min_balance_block
  ]).create_file(f"my_payments_analytics_{date.today().year}_{date.today().month}_{date.today().day}")
