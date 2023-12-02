from heapq import heappop, heappush

def subarrays_medians_sum(numbers: list):
    """Функция расчета сумм медиан всех подмассивов [0:1], [0:2], [0:3], ... [0:n]"""
    medians_sum = 0
    smallerHalf, largerHalf = [], []
    for number in numbers:
        heappush(smallerHalf, -number)
        heappush(largerHalf, -heappop(smallerHalf)) 
        if len(smallerHalf) < len(largerHalf):
            heappush(smallerHalf, -heappop(largerHalf))
        medians_sum += -smallerHalf[0]
    return medians_sum

if __name__ == '__main__':
    numbers = [int(number) for number in input().split()][1:]
    print(subarrays_medians_sum(numbers))
