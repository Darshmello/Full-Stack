def adding():
    nums = input("Enter numbers separated by spaces: ")
    num_list = nums.split()

    if len(num_list) < 2:
        print("Error: Please enter at least two numbers.")
    else:
        try:
            # Convert the list of strings to a list of floats
            nums_float = [float(num) for num in num_list]
            total = sum(nums_float)
            print("The sum is:", total)
        except ValueError:
            print("Error: Please enter only numbers.")

adding()