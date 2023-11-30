"""
Вовочка ломает систему безопасности Пентагона. 
Для этого ему понадобилось узнать, какие символы 
в секретных зашифрованных посланиях употребляются 
чаще других. Для удобства изучения Вовочка хочет получить 
графическое представление встречаемости символов. Поэтому 
он хочет построить гистограмму количества символов в сообщении. 
"""
import re
import sys

input_file_path = sys.argv[1]
with open(input_file_path, 'r') as f:
    input_data = f.read()

#O(nlogn)
chars = {}
for char in re.findall("\S", input_data):
    chars.update({char : chars.get(char, 0) + 1})
columns = sorted(chars.items())
max_height = max(chars.values())
for height in range(max_height, 0, -1):
    print("".join(["#" if height <= column[1] else " " for column in columns]))
print(*[column[0] for column in columns], sep='')
