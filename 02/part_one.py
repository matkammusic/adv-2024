# help Tom Tamisier
# the error was that elememt weren't converted to number in isAscending and isDescending

total = 0

def isAscending(arr):
    for i in range(len(arr)-1):
        if arr[i] >= arr[i + 1]:
            return False
    return True

def isDescending(arr):
    for i in range(len(arr)-1):
        if arr[i] <= arr[i + 1]:
            return False
    return True

def correctInterval(arr):
    for i in range(len(arr) - 1):
        if 1 <= abs(int(arr[i]) - int(arr[i + 1])) <= 3:
            continue
        else:
            return False
    return True

with open('./input.txt') as input_file:
    for line in input_file:
        sep = line.split(" ")
        if correctInterval(sep):
            if isDescending(sep) or isAscending(sep):
                total += 1

print(total)
