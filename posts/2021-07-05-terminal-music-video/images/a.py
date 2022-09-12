def difference_calculator(arr):
    # indicator 1:
    # count += 1 if element k appears exactly k consecutive times
    v_map = {}
    count_1 = 0
    compressed = [] # each element is a tuple (element, count)
    for element in arr:
        if element not in v_map:
            v_map[element] = 1
        if compressed and compressed[-1][0] == element:
            compressed[-1] = (element, compressed[-1][1] + 1)
        else:
            compressed.append((element, 1))
    for element, count in compressed:
        if element == count:
            count_1 += 1
    
    count_2 = 0
    # indicator 2:
    done = {}
    for element in v_map:
        if element in done:
            continue
        # go to arr[element], and from there, for to arr[element] + element - 1
        # if all elements in this range are equal to element, then count_2 += 1
        if element == 0:
            continue
        start = element
        end = element + v_map[element] - 1
        if start > len(arr) or end > len(arr):
            continue
        if all(arr[i] == element for i in range(start, end + 1)):
            count_2 += 1
        done[element] = True
    
    return abs(count_1 - count_2)
