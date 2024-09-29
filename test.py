nums = [1,3,4,6,8,12,15,11,9,7,2]
"""

return index of maximum value of an array of length N, the first K elements 
of the array are sorted in 
incr order and the last n-k elemtns are sorted in decr order

"""

d={}
for i in range(0,len(nums)):
    d[nums[i]]=i

sortList=sorted(nums)

maxEle=max(sortList)

print(maxEle)
print(d[maxEle])