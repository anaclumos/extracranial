# generate random hex
import os
import random
import shutil


def generateRandomHex():
    return ''.join(random.choice('0123456789ABCDEF') for i in range(6))

for filename in os.listdir('.'):
    if filename.endswith('.md'):
        new_filename = generateRandomHex() + '.md'
        shutil.move(filename, new_filename)

for folder in os.listdir('.'):
    if os.path.isdir(folder):
        new_folder = generateRandomHex() + '.md'
        shutil.move(folder, new_folder)