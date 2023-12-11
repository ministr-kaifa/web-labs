from datetime import date

class Quartal:
  def __init__(self, date: date) -> None:
    self.quartal =(date.month - 1)//3 + 1
    self.year = date.year
  
  def to_date(self):
    month = (self.quartal - 1) * 3 + 1
    return date(self.year, month, 1)
  
  def __repr__(self) -> str:
    return "Q" + str(self.quartal) + " " + str(self.year) + " год"
  
  def __hash__(self):
    return (self.year * 10) + self.quartal
  
  def __eq__(self, other):
    return self.quartal == other.quartal and self.year == other.year
  
  def __lt__(self, other):
    return hash(self) < hash(other)