from abc import ABC, abstractmethod
import json
from datetime import datetime
from typing import List

from domain import Client, Payment

class ClientDao(ABC):
  @abstractmethod
  def find_all(self) -> List[Client]:
    pass
  
class PaymentDao(ABC):
  @abstractmethod
  def find_all(self) -> List[Payment]:
    pass

  @abstractmethod
  def find_all_payments_by_client_id(self, client_id):
    pass

class CachedJsonFileClientDao(ClientDao):
  def __init__(self, file_path):
    self.file_path = file_path
    self.cache = None

  def find_all(self):
    if self.cache is None:
      with open(self.file_path, 'r') as file:
        clients_data = json.load(file)
      clients_data = clients_data['clients']
      self.cache = [Client(**client_data) for client_data in clients_data]
    return self.cache

class CachedJsonFilePaymentDao(PaymentDao):
  def __init__(self, file_path):
      self.file_path = file_path
      self.cache = None

  def find_all(self):
    if self.cache is None:
      with open(self.file_path, 'r') as file:
          payments_data = json.load(file)
      payments_data = payments_data['payments']
      self.cache = [Payment(**payment_data) for payment_data in payments_data]
    return self.cache
    
  def find_all_payments_by_client_id(self, client_id):
    return [payment for payment in self.find_all() if payment.client_id == client_id]
