"""
Дана прямоугольная доска $N*M$ (**N** строк и **M** столбцов).  
В левом верхнем углу находится шахматный конь Олег, 
которого необходимо переместить в правый нижний угол доски. 
В данной задаче конь может перемещаться на две клетки вниз 
и одну клетку вправо или на одну клетку вниз и две клетки вправо.

Необходимо определить, сколько существует различных маршрутов, 
ведущих из левого верхнего в правый нижний угол.
"""
import sys

input_file_path = sys.argv[1]
with open(input_file_path, 'r') as f:
    input_data = f.read()
    
#bfs O(nm)
width, height = input_data.split()
destination = (int(width) - 1, int(height) - 1)
positions_queue = [(0, 0)]
successful_paths_amount = 0
for current_position in positions_queue:
    if current_position == destination:
        successful_paths_amount += 1
    else:
        for move in [(2, 1), (1, 2)]:
            next_position = (current_position[0] + move[0], current_position[1] + move[1])
            if (0, 0) <= next_position and next_position <= destination:
                positions_queue.append(next_position)
print(successful_paths_amount)
