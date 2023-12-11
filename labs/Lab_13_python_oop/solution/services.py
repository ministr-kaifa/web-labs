from typing import List, Tuple

from domain import Client, Payment
from persistence import ClientDao, PaymentDao

class ClientService:

  def __init__(self, payment_dao: PaymentDao, client_dao: ClientDao):
    self.payment_dao = payment_dao
    self.client_dao = client_dao

  def find_all_client_payments(self, client: Client) -> List[Payment]:
    return self.payment_dao.find_all_payments_by_client_id(client.id)

  def find_all(self) -> List[Client]:
    return self.client_dao.find_all()
  
  def find_all_with_payments(self) -> List[Tuple[Client, List[Payment]]]:
    clients = self.client_dao.find_all()
    payments = self.payment_dao.find_all()
    payments_map = {}
    for payment in payments:
      payments_map.update({payment.client_id : [payment] + payments_map.get(payment.client_id, [])})

    return [(client, payments_map.get(client.id, [])) for client in clients]

class PaymentService:

  def __init__(self, payment_dao: PaymentDao, client_dao: ClientDao):
    self.payment_dao = payment_dao
    self.client_dao = client_dao

  def find_all(self) -> List[Payment]:
    return self.payment_dao.find_all()
  
  