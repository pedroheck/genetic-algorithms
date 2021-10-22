import random


def foo(x, y, z):
    return 6*x**3 + 9*y**2 + 90*z - 25

def fitness(x, y, z):
    answer = foo(x, y, z)

    if answer == 0:
        return 99999
    else: return abs(1/answer)

# Generating random solutions
solutions = []
for s in range(1000):
    solutions.append((
        random.uniform(0, 10000), 
        random.uniform(0, 10000), 
        random.uniform(0, 10000)
    ))

for i in range(10000):
    rankedSolutions = []
    for s in solutions:
        rankedSolutions.append((fitness(s[0], s[1], s[2]), s))