# Function to automate the punishment program
def punishment_automation():
    # a. Ask the user for a sentence and number of times to repeat
    sentence = input("Enter the sentence: ")
    try:
        times = int(input("Enter the number of times to repeat the sentence: "))
    except ValueError:
        print("Error: Please enter a valid number for repetitions.")
        return # Exit the function if input is not a number

    # b. Write the sentence to a file
    file_name = "CompletedPunishment.txt"

    # Using 'w' mode opens the file for writing and will create it if it doesn't exist
    # 'with' statement ensures the file is automatically closed after writing
    with open(file_name, 'w') as file:
        # Loop to write the sentence the specified number of times
        for _ in range(times):
            file.write(sentence + "\n") # The "\n" adds a line break

    print(f"'{sentence}' has been written to '{file_name}' {times} times.")

# Call the function to run the program
punishment_automation()