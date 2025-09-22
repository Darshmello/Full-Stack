class Course:
    def __init__(self, dept, num, name, credits, days, start_time, end_time, grade):
        self.department = dept
        self.number = num
        self.name = name
        self.credits = credits
        self.lecture_days = days
        self.start_time = start_time
        self.end_time = end_time
        self.avg_grade = grade

    def format(self, course_num):
        """Returns the formatted class information as a string."""
        return (f"COURSE {course_num}: {self.department}{self.number}: {self.name}\n"
                f"Number of Credits: {self.credits}\n"
                f"Days of Lectures: {self.lecture_days}\n"
                f"Lecture Time: {self.start_time} - {self.end_time}\n"
                f"Stat: on average, students get {self.avg_grade}% in this course\n")

def class_schedule_program():
    """Parses class data and formats it into a new file."""
    input_data = """3
CSE
030
Data Structures
4
Monday, Wednesday
4:30pm
5:45pm
85
CSE
165
Introduction to Object Oriented Programming
4
Tuesday, Thursday
9:00am
10:15am
87
BIO
101
Introduction to Biology
3
Tuesday, Thursday
11:00am
12:15pm
91"""

    lines = input_data.strip().split('\n')
    
    num_courses = int(lines[0])
    
    courses = []
    for i in range(num_courses):
        start_index = 1 + i * 8
        dept = lines[start_index].strip()
        num = lines[start_index + 1].strip()
        name = lines[start_index + 2].strip()
        credits = lines[start_index + 3].strip()
        days = lines[start_index + 4].strip()
        start_time = lines[start_index + 5].strip()
        end_time = lines[start_index + 6].strip()
        grade = lines[start_index + 7].strip()
        
        courses.append(Course(dept, num, name, credits, days, start_time, end_time, grade))

    output_file_name = "classesOutput.txt"
    with open(output_file_name, 'w') as file:
        for i, course in enumerate(courses):
            file.write(course.format(i + 1))
            if i < len(courses) - 1:
                file.write("\n")

    print(f"Class schedule has been formatted and saved to '{output_file_name}'.")

class_schedule_program()