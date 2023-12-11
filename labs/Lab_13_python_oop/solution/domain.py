from datetime import datetime
from time import strptime
import time

class Client:
  def __init__(self, id: int, fio: str, phone: str, city: str, email: str):
    self.id = id
    self.fio = fio
    self.phone = phone
    self.city = city
    self.email = email

  def __repr__(self):
    return f"Client(id={self.id}, fio={self.fio}, phone={self.phone}, city={self.city}, email={self.email})"


class Payment:
  def __init__(self, id: int, client_id: int, amount: int, created_at: str):
    self.id = id
    self.client_id = client_id
    self.amount = amount
    self.created_at = datetime.strptime(created_at, "%Y-%m-%dT%H:%M:%S.%fZ")

  def __repr__(self):
    return f"Payment(id={self.id}, client_id={self.client_id}, amount={self.amount}, created_at={self.created_at})"
