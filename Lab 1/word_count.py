import string

def word_count_program():
    """Counts the occurrences of a word in a given text file."""
    text_content = """Welcome! Are you completely new to programming? If not then we presume you will be looking for information about why and how to get started with Python. Fortunately an experienced programmer in any programming language (whatever it may be) can pick up Python very quickly. It's also easy for beginners to use and learn, so jump in!!

Installing Python is generally easy, and nowadays many Linux and UNIX distributions include a recent Python. Even some Windows computers (notably those from HP) now come with Python already installed. If you do need to install Python and aren't confident about the task you can find a few notes on the BeginnersGuide/Download wiki page, but installation is unremarkable on most platforms.

If you want to know whether a particular application, or a library with particular functionality, is available in Python there are a number of possible sources of information. The Python web site provides a Python Package Index (also known as the Cheese Shop, a reference to the Monty Python script of that name). There is also a search page for a number of sources of Python-related information. Failing that, just Google for a phrase including the word python and you may well get the result you need. If all else fails, ask on the python newsgroup and there's a good chance someone will put you on the right track."""

    search_word = input("Enter a word to count: ").strip().lower()

    # Clean the text: remove punctuation and convert to lowercase
    translator = str.maketrans('', '', string.punctuation)
    clean_text = text_content.translate(translator).lower()

    # Count the word by splitting the cleaned text into a list of words
    word_list = clean_text.split()
    count = word_list.count(search_word)

    print(f"The word '{search_word}' occurs {count} times.")

word_count_program()