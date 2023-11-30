"""
Олег очень любит занятия по программированию в университете. 
А еще больше он любит узнавать новые алгоритмы и структуры данных.
Для того, чтобы ему не было скучно на очередном занятии, преподаватель
 предложил придумать способ поиска медианы для последовательности 
**X** из **n** элементов. Олег быстро нашел в сети нужный алгоритм и 
отчитался перед учителем. Тогда тот предложил усложнённую версию задачи: 
для каждого **i** от **1** до **n** нужно найти медиану среди первых **i** 
элементов последовательности **X**. В качестве результата преподаватель 
попросил сказать сумму найденных значений.
"""
import math
import sys

input_file_path = sys.argv[1]
with open(input_file_path, 'r') as f:
    input_data = f.read()

#O(nlog(n))
numbers = [int(number) for number in input_data.split()[1:]]
numbers_sorted = []
medians = []
for number in numbers:
    left, right = 0, len(numbers_sorted) - 1
    while left <= right:
        mid = (left + right) // 2
        if numbers_sorted[mid] == number:
            pass
        elif numbers_sorted[mid] < number:
            left = mid + 1
        else:
            right = mid - 1
    numbers_sorted.insert(left, number)
    medians.append(numbers_sorted[math.ceil(len(numbers_sorted)/2) - 1])
print(sum(medians))
