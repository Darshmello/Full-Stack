import json
import os

GRADES_FILE = "grades.txt"

# FUNCTION load_grades
def load_grades():
    if os.path.exists(GRADES_FILE):
        with open(GRADES_FILE, 'r') as file:
            return json.load(file)
    return {}

# FUNCTION save_grades
def save_grades(grades):
    with open(GRADES_FILE, 'w') as file:
        json.dump(grades, file, indent=4)

# FUNCTION create_grade
def create_grade(grades):
    name = input("Enter student's full name: ")
    grade = input(f"Enter the grade for {name}: ")
    grades[name] = grade
    save_grades(grades)
    print(f"Grade for {name} added.")

# FUNCTION get_grade
def get_grade(grades):
    name = input("Enter student's full name to get the grade: ")
    if name in grades:
        print(f"{name}'s grade: {grades[name]}")
    else:
        print("Student not found.")

# FUNCTION edit_grade
def edit_grade(grades):
    name = input("Enter student's full name to edit the grade: ")
    if name in grades:
        new_grade = input(f"Enter the new grade for {name}: ")
        grades[name] = new_grade
        save_grades(grades)
        print(f"{name}'s grade updated.")
    else:
        print("Student not found.")

# FUNCTION delete_grade
def delete_grade(grades):
    name = input("Enter student's full name to delete the grade: ")
    if name in grades:
        del grades[name]
        save_grades(grades)
        print(f"{name}'s grade deleted.")
    else:
        print("Student not found.")

# FUNCTION grade_program
def grade_program():
    grades = load_grades()
    
    while True:
        print("\n--- Grade Program Menu ---")
        print("1. Add a grade")
        print("2. Get a grade")
        print("3. Edit a grade")
        print("4. Delete a grade")
        print("5. Exit")
        
        choice = input("Choose an option: ")
        
        if choice == '1':
            create_grade(grades)
        elif choice == '2':
            get_grade(grades)
        elif choice == '3':
            edit_grade(grades)
        elif choice == '4':
            delete_grade(grades)
        elif choice == '5':
            print("Exiting program.")
            break
        else:
            print("Invalid option. Please choose a number from 1 to 5.")

grade_program()