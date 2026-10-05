import { useEffect,useState } from "react";
import "./Preparation.css";
function Preparation({ goDashboard }) {

const [selectedTopic, setSelectedTopic] = useState(null);
const [currentQuestion, setCurrentQuestion] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState("");
const [submitted, setSubmitted] = useState(false);
const [score, setScore] = useState(0);

const [questions, setQuestions] = useState([]);
  const topics = {

  Aptitude: {
  title: "🧠 Aptitude Practice",
  questions: [
    {
      question: "What is 20% of 150?",
      options: ["20", "25", "30", "35"],
      answer: "30",
      explanation: "20% of 150 = (20/100) × 150 = 30."
    },
    {
      question: "A product is bought for ₹500 and sold for ₹600. What is the profit?",
      options: ["₹50", "₹75", "₹100", "₹120"],
      answer: "₹100",
      explanation: "Profit = Selling Price − Cost Price = ₹600 − ₹500 = ₹100."
    },
    {
      question: "Find the simple interest on ₹1000 at 10% per annum for 2 years.",
      options: ["₹100", "₹150", "₹200", "₹250"],
      answer: "₹200",
      explanation: "SI = (P × R × T) / 100 = (1000 × 10 × 2) / 100 = ₹200."
    },
    {
      question: "The ratio of boys to girls is 2:3. If there are 20 boys, how many girls are there?",
      options: ["25", "30", "35", "40"],
      answer: "30",
      explanation: "2 parts = 20, so 1 part = 10. Girls = 3 × 10 = 30."
    },
    {
      question: "What is the average of 10, 20, 30, 40 and 50?",
      options: ["25", "30", "35", "40"],
      answer: "30",
      explanation: "Average = (10 + 20 + 30 + 40 + 50) / 5 = 150 / 5 = 30."
    },
    {
      question: "5 workers can complete a work in 10 days. How many days will 10 workers take, assuming equal efficiency?",
      options: ["2 days", "5 days", "10 days", "20 days"],
      answer: "5 days",
      explanation: "Workers and days are inversely proportional. Doubling workers from 5 to 10 halves the time to 5 days."
    },
    {
      question: "A car travels at 60 km/h for 3 hours. What distance does it cover?",
      options: ["120 km", "150 km", "180 km", "200 km"],
      answer: "180 km",
      explanation: "Distance = Speed × Time = 60 × 3 = 180 km."
    },
    {
      question: "Which of the following is a prime number?",
      options: ["21", "27", "29", "33"],
      answer: "29",
      explanation: "29 has only two factors: 1 and 29, so it is prime."
    },
    {
      question: "What is the HCF of 12 and 18?",
      options: ["3", "6", "9", "12"],
      answer: "6",
      explanation: "The highest common factor of 12 and 18 is 6."
    },
    {
      question: "What is the LCM of 4 and 6?",
      options: ["8", "10", "12", "24"],
      answer: "12",
      explanation: "The smallest number divisible by both 4 and 6 is 12."
    },

    {
      question: "The present ages of A and B are 40 and 10 years. What is their age difference?",
      options: ["20 years", "25 years", "30 years", "35 years"],
      answer: "30 years",
      explanation: "Age difference = 40 − 10 = 30 years."
    },
    {
      question: "What is the probability of getting a head when a fair coin is tossed once?",
      options: ["0", "1/4", "1/2", "1"],
      answer: "1/2",
      explanation: "A fair coin has two equally likely outcomes, so P(Head) = 1/2."
    },
    {
      question: "Find the next number: 2, 4, 8, 16, ?",
      options: ["24", "28", "32", "36"],
      answer: "32",
      explanation: "Each number is multiplied by 2. Therefore, 16 × 2 = 32."
    },
    {
      question: "Which number is divisible by 3?",
      options: ["124", "125", "126", "127"],
      answer: "126",
      explanation: "The sum of digits of 126 is 1 + 2 + 6 = 9, which is divisible by 3."
    },
    {
      question: "What is 3/4 of 100?",
      options: ["50", "60", "75", "80"],
      answer: "75",
      explanation: "(3/4) × 100 = 75."
    },
    {
      question: "The ratio of milk to water is 3:2. If the total mixture is 25 litres, how much milk is present?",
      options: ["10 L", "12 L", "15 L", "18 L"],
      answer: "15 L",
      explanation: "Total parts = 5. One part = 25/5 = 5 L. Milk = 3 × 5 = 15 L."
    },
    {
      question: "A product costs ₹5000 and is sold for ₹5500. What is the profit percentage?",
      options: ["5%", "8%", "10%", "12%"],
      answer: "10%",
      explanation: "Profit = ₹500. Profit% = (500/5000) × 100 = 10%."
    },
    {
      question: "If 3 pens cost ₹30, what is the cost of 7 pens?",
      options: ["₹60", "₹70", "₹80", "₹90"],
      answer: "₹70",
      explanation: "One pen costs ₹10. Therefore, 7 pens cost ₹70."
    },
    {
      question: "A train travels 240 km in 4 hours. What is its average speed?",
      options: ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
      answer: "60 km/h",
      explanation: "Speed = Distance / Time = 240 / 4 = 60 km/h."
    },
    {
      question: "What is 25% of 400?",
      options: ["50", "75", "100", "125"],
      answer: "100",
      explanation: "25% of 400 = (25/100) × 400 = 100."
    },

    {
      question: "A shirt marked at ₹1000 is sold at a discount of 20%. What is the selling price?",
      options: ["₹700", "₹750", "₹800", "₹850"],
      answer: "₹800",
      explanation: "Discount = 20% of ₹1000 = ₹200. Selling price = ₹1000 − ₹200 = ₹800."
    },
    {
      question: "A number is increased from 200 to 250. What is the percentage increase?",
      options: ["20%", "25%", "30%", "35%"],
      answer: "25%",
      explanation: "Increase = 50. Percentage increase = (50/200) × 100 = 25%."
    },
    {
      question: "A number is decreased from 500 to 400. What is the percentage decrease?",
      options: ["10%", "15%", "20%", "25%"],
      answer: "20%",
      explanation: "Decrease = 100. Percentage decrease = (100/500) × 100 = 20%."
    },
    {
      question: "Find the simple interest on ₹2000 at 5% per annum for 3 years.",
      options: ["₹200", "₹250", "₹300", "₹350"],
      answer: "₹300",
      explanation: "SI = (2000 × 5 × 3) / 100 = ₹300."
    },
    {
      question: "If the cost price is ₹800 and the selling price is ₹720, what is the loss percentage?",
      options: ["5%", "8%", "10%", "12%"],
      answer: "10%",
      explanation: "Loss = ₹80. Loss% = (80/800) × 100 = 10%."
    },
    {
      question: "The ratio of two numbers is 3:5 and their sum is 64. What is the smaller number?",
      options: ["20", "24", "28", "32"],
      answer: "24",
      explanation: "Total parts = 8. One part = 64/8 = 8. Smaller number = 3 × 8 = 24."
    },
    {
      question: "The average of 5 numbers is 20. What is their total?",
      options: ["80", "90", "100", "120"],
      answer: "100",
      explanation: "Total = Average × Number of values = 20 × 5 = 100."
    },
    {
      question: "A can complete a work in 12 days. What fraction of the work does A complete in one day?",
      options: ["1/6", "1/10", "1/12", "1/15"],
      answer: "1/12",
      explanation: "If the whole work takes 12 days, one day's work is 1/12."
    },
    {
      question: "A person travels 150 km at a speed of 50 km/h. How much time does the journey take?",
      options: ["2 hours", "3 hours", "4 hours", "5 hours"],
      answer: "3 hours",
      explanation: "Time = Distance / Speed = 150 / 50 = 3 hours."
    },
    {
      question: "What is the HCF of 24 and 36?",
      options: ["6", "8", "12", "18"],
      answer: "12",
      explanation: "The highest common factor of 24 and 36 is 12."
    },

    {
      question: "What is the LCM of 8 and 12?",
      options: ["16", "20", "24", "32"],
      answer: "24",
      explanation: "The smallest number divisible by both 8 and 12 is 24."
    },
    {
      question: "What is the remainder when 47 is divided by 5?",
      options: ["1", "2", "3", "4"],
      answer: "2",
      explanation: "47 = 5 × 9 + 2, so the remainder is 2."
    },
    {
      question: "Find the next number: 3, 6, 12, 24, ?",
      options: ["36", "42", "48", "54"],
      answer: "48",
      explanation: "Each number is multiplied by 2. Therefore, 24 × 2 = 48."
    },
    {
      question: "Find the next number: 5, 10, 15, 20, ?",
      options: ["22", "24", "25", "30"],
      answer: "25",
      explanation: "The sequence increases by 5 each time, so the next number is 25."
    },
    {
      question: "A father is 40 years old and his son is 10 years old. After how many years will the father be twice the son's age?",
      options: ["10 years", "15 years", "20 years", "25 years"],
      answer: "20 years",
      explanation: "After 20 years, father = 60 and son = 30. Therefore, 60 is twice 30."
    },
    {
      question: "A bag contains 3 red balls and 2 blue balls. What is the probability of selecting a red ball?",
      options: ["2/5", "3/5", "1/2", "4/5"],
      answer: "3/5",
      explanation: "Total balls = 5 and red balls = 3. Probability = 3/5."
    },
    {
      question: "A mixture contains 4 litres of milk and 6 litres of water. What is the ratio of milk to water?",
      options: ["2:3", "3:2", "4:5", "5:3"],
      answer: "2:3",
      explanation: "Milk:Water = 4:6. Dividing both by 2 gives 2:3."
    },
    {
      question: "A person earns ₹20,000 per month and saves ₹5,000. What percentage of the salary is saved?",
      options: ["20%", "25%", "30%", "35%"],
      answer: "25%",
      explanation: "Savings percentage = (5000/20000) × 100 = 25%."
    },
    {
      question: "If 8 notebooks cost ₹240, what is the cost of 5 notebooks?",
      options: ["₹120", "₹150", "₹160", "₹180"],
      answer: "₹150",
      explanation: "One notebook costs ₹30. Therefore, 5 notebooks cost ₹150."
    },
    {
      question: "Solve: x + 15 = 40.",
      options: ["15", "20", "25", "30"],
      answer: "25",
      explanation: "x = 40 − 15 = 25."
    },

    {
      question: "Solve: 3x = 27.",
      options: ["6", "8", "9", "12"],
      answer: "9",
      explanation: "Divide both sides by 3: x = 27/3 = 9."
    },
    {
      question: "A number is divisible by both 2 and 5. Which of the following must be true?",
      options: [
        "It is divisible by 3",
        "It is divisible by 10",
        "It is an odd number",
        "It is a prime number"
      ],
      answer: "It is divisible by 10",
      explanation: "A number divisible by both 2 and 5 is divisible by their LCM, 10."
    },
    {
      question: "What is the sum of the first 10 natural numbers?",
      options: ["45", "50", "55", "60"],
      answer: "55",
      explanation: "Sum = 10 × 11 / 2 = 55."
    },
    {
      question: "A shopkeeper gives a 10% discount on an item priced at ₹2000. What is the discount amount?",
      options: ["₹100", "₹150", "₹200", "₹250"],
      answer: "₹200",
      explanation: "Discount = 10% of ₹2000 = ₹200."
    },
    {
      question: "A student scores 360 marks out of 500. What is the percentage?",
      options: ["60%", "65%", "72%", "75%"],
      answer: "72%",
      explanation: "Percentage = (360/500) × 100 = 72%."
    },
    {
      question: "If 6 machines produce 600 units in one hour, how many units will 10 machines produce in one hour at the same rate?",
      options: ["800", "900", "1000", "1200"],
      answer: "1000",
      explanation: "One machine produces 100 units per hour. Therefore, 10 machines produce 1000 units."
    },
    {
      question: "A man walks at 5 km/h. How far will he walk in 4 hours?",
      options: ["15 km", "20 km", "25 km", "30 km"],
      answer: "20 km",
      explanation: "Distance = Speed × Time = 5 × 4 = 20 km."
    },
    {
      question: "Which is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      answer: "2",
      explanation: "2 is the smallest prime number and the only even prime number."
    },
    {
      question: "What is the average of 15, 25, 35 and 45?",
      options: ["25", "30", "35", "40"],
      answer: "30",
      explanation: "Average = (15 + 25 + 35 + 45) / 4 = 120 / 4 = 30."
    },
    {
      question: "If a number is increased by 20% and becomes 120, what was the original number?",
      options: ["80", "90", "100", "110"],
      answer: "100",
      explanation: "120 represents 120% of the original number. Original = 120/1.2 = 100."
    }
  ]
},

    Java: {
  title: "☕ Java Practice",
  questions: [
    {
      question: "Which keyword is used to create a class in Java?",
      options: ["class", "struct", "object", "define"],
      answer: "class",
      explanation: "The class keyword is used to declare a class in Java."
    },

    {
      question: "Which method is the starting point of a Java program?",
      options: ["start()", "run()", "main()", "execute()"],
      answer: "main()",
      explanation: "Java program execution starts from the main() method."
    },

    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["implements", "extends", "inherits", "super"],
      answer: "extends",
      explanation: "The extends keyword is used when one class inherits another class."
    },

    {
      question: "Which data type is used to store whole numbers in Java?",
      options: ["float", "int", "char", "boolean"],
      answer: "int",
      explanation: "The int data type is used to store whole numbers such as 10, 25 and 100."
    },

    {
      question: "Which keyword is used to create an object in Java?",
      options: ["object", "create", "new", "class"],
      answer: "new",
      explanation: "The new keyword is used to create an object of a class."
    },

    {
      question: "Which symbol is used to end a statement in Java?",
      options: [".", ",", ";", ":"],
      answer: ";",
      explanation: "Java statements normally end with a semicolon (;)."
    },

    {
      question: "Which operator is used to find the remainder?",
      options: ["/", "%", "*", "//"],
      answer: "%",
      explanation: "The % operator returns the remainder after division."
    },

    {
      question: "Which keyword is used to take input using Scanner?",
      options: ["input", "Scanner", "scan", "read"],
      answer: "Scanner",
      explanation: "The Scanner class from java.util is commonly used to read input from the user."
    },

    {
      question: "Which method is used to read an integer using Scanner?",
      options: ["getInt()", "readInt()", "nextInt()", "inputInt()"],
      answer: "nextInt()",
      explanation: "The nextInt() method reads an integer value from the Scanner."
    },

    {
      question: "Which statement is used to make a decision based on a condition?",
      options: ["if", "loop", "class", "import"],
      answer: "if",
      explanation: "The if statement executes a block of code when its condition is true."
    },

    {
      question: "Which loop is commonly used when the number of iterations is known?",
      options: ["if", "for", "switch", "try"],
      answer: "for",
      explanation: "A for loop is commonly used when the number of iterations is known."
    },

    {
      question: "Which loop executes its body at least once?",
      options: ["for", "while", "do-while", "if"],
      answer: "do-while",
      explanation: "A do-while loop executes its body once before checking the condition."
    },

    {
      question: "Which keyword is used to exit a loop or switch statement?",
      options: ["stop", "exit", "break", "continue"],
      answer: "break",
      explanation: "The break statement immediately terminates the nearest loop or switch statement."
    },

    {
      question: "Which keyword skips the current iteration of a loop?",
      options: ["skip", "break", "continue", "pass"],
      answer: "continue",
      explanation: "The continue statement skips the remaining statements in the current iteration and moves to the next iteration."
    },

    {
      question: "Which keyword is used to define a constant variable in Java?",
      options: ["constant", "static", "final", "fixed"],
      answer: "final",
      explanation: "A variable declared with final cannot be reassigned after initialization."
    },

    {
      question: "Which concept allows the same method name with different parameters?",
      options: ["Inheritance", "Method Overloading", "Encapsulation", "Abstraction"],
      answer: "Method Overloading",
      explanation: "Method overloading allows multiple methods with the same name but different parameter lists."
    },

    {
      question: "Which OOP concept hides the internal implementation details?",
      options: ["Inheritance", "Polymorphism", "Abstraction", "Compilation"],
      answer: "Abstraction",
      explanation: "Abstraction hides implementation details and exposes only the necessary functionality."
    },

    {
      question: "Which OOP concept binds data and methods together inside a class?",
      options: ["Encapsulation", "Inheritance", "Compilation", "Iteration"],
      answer: "Encapsulation",
      explanation: "Encapsulation combines data and methods into a single unit such as a class."
    },

    {
      question: "Which keyword is used to refer to the current object?",
      options: ["self", "current", "this", "object"],
      answer: "this",
      explanation: "The this keyword refers to the current object of a class."
    },

    {
      question: "Which keyword is used to call the parent class constructor or method?",
      options: ["parent", "base", "super", "this"],
      answer: "super",
      explanation: "The super keyword is used to refer to members of the immediate parent class."
    },

    // Q21
    {
      question: "Which method is used to find the length of a String in Java?",
      options: ["size()", "length()", "count()", "getLength()"],
      answer: "length()",
      explanation: "The length() method returns the number of characters in a String."
    },

    // Q22
    {
      question: "Which method is used to access a character at a specific index in a String?",
      options: ["charAt()", "getChar()", "character()", "indexChar()"],
      answer: "charAt()",
      explanation: "The charAt() method returns the character at the specified index."
    },

    // Q23
    {
      question: "Which method is used to compare two Strings based on their content?",
      options: ["compare()", "equals()", "same()", "match()"],
      answer: "equals()",
      explanation: "The equals() method compares the contents of two String objects."
    },

    // Q24
    {
      question: "Which method converts a String into uppercase letters?",
      options: ["upper()", "toUpperCase()", "uppercase()", "convertUpper()"],
      answer: "toUpperCase()",
      explanation: "The toUpperCase() method converts all letters in a String to uppercase."
    },

    // Q25
    {
      question: "Which method converts a String into lowercase letters?",
      options: ["lower()", "toLowerCase()", "lowercase()", "convertLower()"],
      answer: "toLowerCase()",
      explanation: "The toLowerCase() method converts all letters in a String to lowercase."
    },

    // Q26
    {
      question: "Which method is used to extract a part of a String?",
      options: ["part()", "substring()", "extract()", "sliceString()"],
      answer: "substring()",
      explanation: "The substring() method is used to extract a portion of a String."
    },

    // Q27
    {
      question: "What is the index of the first character in a Java String?",
      options: ["0", "1", "-1", "2"],
      answer: "0",
      explanation: "Java String indexing starts from 0."
    },

    // Q28
    {
      question: "Which method checks whether a String contains a particular sequence of characters?",
      options: ["contains()", "has()", "check()", "includesText()"],
      answer: "contains()",
      explanation: "The contains() method returns true if the specified sequence exists in the String."
    },

    // Q29
    {
      question: "Which method is used to define a method that returns no value?",
      options: ["null", "empty", "void", "none"],
      answer: "void",
      explanation: "The void keyword specifies that a method does not return a value."
    },

    // Q30
    {
      question: "What is a parameter in a Java method?",
      options: [
        "A value returned by a method",
        "A variable declared in the method definition",
        "A class name",
        "An exception"
      ],
      answer: "A variable declared in the method definition",
      explanation: "A parameter is a variable specified in a method declaration that receives an argument."
    },

    // Q31
    {
      question: "Which keyword is used when a method belongs to the class rather than an object?",
      options: ["static", "object", "class", "global"],
      answer: "static",
      explanation: "The static keyword makes a method belong to the class rather than individual objects."
    },

    // Q32
    {
      question: "What is a constructor in Java?",
      options: [
        "A method used only for calculations",
        "A special member used to initialize objects",
        "A variable type",
        "A loop statement"
      ],
      answer: "A special member used to initialize objects",
      explanation: "A constructor is a special member of a class used to initialize objects."
    },

    // Q33
    {
      question: "Which statement about a constructor is correct?",
      options: [
        "It must have a return type",
        "It has the same name as the class",
        "It must be static",
        "It cannot have parameters"
      ],
      answer: "It has the same name as the class",
      explanation: "A constructor must have the same name as its class and does not have a return type."
    },

    // Q34
    {
      question: "Which access modifier allows access only within the same class?",
      options: ["public", "protected", "private", "default"],
      answer: "private",
      explanation: "The private access modifier restricts access to the same class."
    },

    // Q35
    {
      question: "Which access modifier provides the widest access in Java?",
      options: ["private", "protected", "public", "default"],
      answer: "public",
      explanation: "A public member can be accessed from classes in different packages, subject to normal Java access rules."
    },

    // Q36
    {
      question: "Which OOP concept allows a child class to provide its own implementation of a parent method?",
      options: ["Method Overriding", "Method Overloading", "Encapsulation", "Abstraction"],
      answer: "Method Overriding",
      explanation: "Method overriding allows a subclass to provide its own implementation of an inherited method."
    },

    // Q37
    {
      question: "Which concept allows one interface or parent type to refer to objects of different child classes?",
      options: ["Encapsulation", "Polymorphism", "Compilation", "Iteration"],
      answer: "Polymorphism",
      explanation: "Polymorphism allows one reference type to represent objects of different related classes."
    },

    // Q38
    {
      question: "Which keyword is used to declare an abstract class?",
      options: ["abstract", "virtual", "interface", "extends"],
      answer: "abstract",
      explanation: "The abstract keyword is used to declare an abstract class."
    },

    // Q39
    {
      question: "Which keyword is used to implement an interface in Java?",
      options: ["extends", "implements", "interface", "inherits"],
      answer: "implements",
      explanation: "A class uses the implements keyword to implement an interface."
    },

    // Q40
    {
      question: "Which block is used to handle an exception in Java?",
      options: ["if-else", "try-catch", "switch-case", "for-loop"],
      answer: "try-catch",
      explanation: "The try-catch structure is used to handle exceptions in Java."
    },

    // Q41
    {
      question: "Which block contains code that may produce an exception?",
      options: ["catch", "finally", "try", "throw"],
      answer: "try",
      explanation: "The try block contains code that may throw an exception."
    },

    // Q42
    {
      question: "Which block is generally executed whether an exception occurs or not?",
      options: ["try", "catch", "finally", "throw"],
      answer: "finally",
      explanation: "The finally block generally executes after try/catch processing whether an exception occurs or not."
    },

    // Q43
    {
      question: "Which keyword is used to explicitly throw an exception?",
      options: ["throws", "throw", "exception", "catch"],
      answer: "throw",
      explanation: "The throw keyword is used to explicitly throw an exception."
    },

    // Q44
    {
      question: "Which keyword is used in a method declaration to indicate possible exceptions?",
      options: ["throw", "throws", "catch", "finally"],
      answer: "throws",
      explanation: "The throws keyword declares exceptions that a method may pass to its caller."
    },

    // Q45
    {
      question: "Which exception occurs when an integer is divided by zero?",
      options: [
        "NullPointerException",
        "ArithmeticException",
        "IOException",
        "ArrayIndexOutOfBoundsException"
      ],
      answer: "ArithmeticException",
      explanation: "Integer division by zero causes an ArithmeticException in Java."
    },

    // Q46
    {
      question: "Which collection class stores elements in a resizable array-like structure?",
      options: ["HashSet", "HashMap", "ArrayList", "TreeMap"],
      answer: "ArrayList",
      explanation: "ArrayList is a resizable array implementation of the List interface."
    },

    // Q47
    {
      question: "Which collection does not allow duplicate elements?",
      options: ["ArrayList", "HashSet", "LinkedList", "Vector"],
      answer: "HashSet",
      explanation: "HashSet does not allow duplicate elements."
    },

    // Q48
    {
      question: "Which collection stores data as key-value pairs?",
      options: ["ArrayList", "HashSet", "HashMap", "Stack"],
      answer: "HashMap",
      explanation: "HashMap stores data using key-value pairs."
    },
    // Q49
    {
      question: "Which method is commonly used to add an element to an ArrayList?",
      options: ["insert()", "add()", "put()", "push()"],
      answer: "add()",
      explanation: "The add() method is used to add an element to an ArrayList."
    },

    // Q50
    {
      question: "Which method is used to get an element from an ArrayList using its index?",
      options: ["fetch()", "get()", "read()", "find()"],
      answer: "get()",
      explanation: "The get() method returns the element stored at the specified index in an ArrayList."
    }
  ]
},
    DSA: {
  title: "🧩 DSA Practice",
  questions: [
    {
      question: "What is the index of the first element in a Java array?",
      options: ["0", "1", "-1", "2"],
      answer: "0",
      explanation: "Java arrays use zero-based indexing, so the first element has index 0."
    },

    {
      question: "Which data structure follows LIFO?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      answer: "Stack",
      explanation: "Stack follows LIFO, which means Last In, First Out."
    },

    {
      question: "Which data structure follows FIFO?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
      explanation: "Queue follows FIFO, which means First In, First Out."
    },

    {
      question: "What is the time complexity of accessing an element by index in an array?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: "O(1)",
      explanation: "Array elements can be accessed directly using their index, so access takes O(1) time."
    },

    {
      question: "Which data structure uses nodes connected by links?",
      options: ["Array", "Linked List", "Stack", "Heap"],
      answer: "Linked List",
      explanation: "A linked list consists of nodes where each node stores data and a reference to another node."
    },

    {
      question: "Which data structure is commonly used to implement recursion?",
      options: ["Queue", "Stack", "Array", "Graph"],
      answer: "Stack",
      explanation: "Function calls in recursion are stored in the call stack."
    },

    {
      question: "Which operation adds an element to a stack?",
      options: ["Enqueue", "Push", "Pop", "InsertFront"],
      answer: "Push",
      explanation: "Push is the operation used to add an element to the top of a stack."
    },

    {
      question: "Which operation removes an element from a stack?",
      options: ["Push", "Enqueue", "Pop", "Search"],
      answer: "Pop",
      explanation: "Pop removes the top element from a stack."
    },

    {
      question: "Which operation adds an element to a queue?",
      options: ["Push", "Pop", "Enqueue", "Peek"],
      answer: "Enqueue",
      explanation: "Enqueue adds an element to the rear of a queue."
    },

    {
      question: "Which operation removes an element from the front of a queue?",
      options: ["Push", "Pop", "Dequeue", "Insert"],
      answer: "Dequeue",
      explanation: "Dequeue removes an element from the front of a queue."
    },

    {
      question: "What is the time complexity of linear search in the worst case?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: "O(n)",
      explanation: "Linear search may need to check every element, giving O(n) time in the worst case."
    },

    {
      question: "Which searching algorithm requires a sorted array?",
      options: ["Linear Search", "Binary Search", "Sequential Search", "Hash Search"],
      answer: "Binary Search",
      explanation: "Binary search works by repeatedly dividing a sorted search range into two halves."
    },

    {
      question: "What is the worst-case time complexity of binary search?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: "O(log n)",
      explanation: "Binary search halves the search space at each step, resulting in O(log n) time."
    },

    {
      question: "Which sorting algorithm repeatedly selects the minimum element?",
      options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Quick Sort"],
      answer: "Selection Sort",
      explanation: "Selection sort repeatedly selects the smallest remaining element and places it in the correct position."
    },

    {
      question: "Which sorting algorithm repeatedly swaps adjacent elements when they are in the wrong order?",
      options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Heap Sort"],
      answer: "Bubble Sort",
      explanation: "Bubble sort compares adjacent elements and swaps them when they are in the wrong order."
    },

    {
      question: "Which data structure is used to represent hierarchical relationships?",
      options: ["Array", "Tree", "Stack", "Queue"],
      answer: "Tree",
      explanation: "A tree represents hierarchical relationships using parent-child connections."
    },

    {
      question: "Which data structure is used to represent networks or connections between entities?",
      options: ["Stack", "Queue", "Graph", "Array"],
      answer: "Graph",
      explanation: "A graph consists of vertices and edges and is useful for representing networks and relationships."
    },

    {
      question: "What is the root node in a tree?",
      options: [
        "The node with no parent",
        "The last node",
        "The node with no children",
        "The smallest node"
      ],
      answer: "The node with no parent",
      explanation: "The root is the topmost node in a tree and does not have a parent."
    },

    {
      question: "Which traversal visits a tree in Root → Left → Right order?",
      options: ["Inorder", "Postorder", "Preorder", "Level Order"],
      answer: "Preorder",
      explanation: "Preorder traversal visits the root first, followed by the left subtree and then the right subtree."
    },

    {
      question: "Which traversal visits a tree in Left → Root → Right order?",
      options: ["Preorder", "Inorder", "Postorder", "Level Order"],
      answer: "Inorder",
      explanation: "Inorder traversal visits the left subtree, then the root, and then the right subtree."
    },

    // Q21
    {
      question: "Which traversal visits a tree in Left → Right → Root order?",
      options: ["Preorder", "Inorder", "Postorder", "Level Order"],
      answer: "Postorder",
      explanation: "Postorder traversal visits the left subtree, then the right subtree, and finally the root."
    },

    // Q22
    {
      question: "Which traversal visits tree nodes level by level?",
      options: ["Preorder", "Inorder", "Postorder", "Level Order"],
      answer: "Level Order",
      explanation: "Level order traversal visits nodes level by level from top to bottom."
    },

    // Q23
    {
      question: "Which data structure is commonly used for Level Order Traversal?",
      options: ["Stack", "Queue", "Array", "HashSet"],
      answer: "Queue",
      explanation: "A queue is commonly used to process tree nodes level by level."
    },

    // Q24
    {
      question: "What is the worst-case time complexity of searching an element in an unsorted array using linear search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: "O(n)",
      explanation: "In the worst case, linear search may need to examine every element."
    },

    // Q25
    {
      question: "What is the space complexity of an array containing n elements?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: "O(n)",
      explanation: "An array storing n elements requires space proportional to n."
    },

    // Q26
    {
      question: "What is the time complexity of inserting an element at the beginning of an array when elements must be shifted?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: "O(n)",
      explanation: "Elements may need to be shifted to make space, requiring O(n) time."
    },

    // Q27
    {
      question: "What is the time complexity of accessing the last element of an array using its index?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: "O(1)",
      explanation: "An array provides direct index-based access, so accessing an element takes O(1) time."
    },

    // Q28
    {
      question: "Which data structure stores elements in a linear sequence using nodes and links?",
      options: ["Tree", "Graph", "Linked List", "Heap"],
      answer: "Linked List",
      explanation: "A linked list stores elements in nodes connected through links or references."
    },

    // Q29
    {
      question: "In a singly linked list, each node normally contains data and what?",
      options: ["Two parent nodes", "A reference to the next node", "Only an index", "A stack"],
      answer: "A reference to the next node",
      explanation: "A singly linked list node contains data and a reference to the next node."
    },

    // Q30
    {
      question: "In a doubly linked list, a node usually contains references to which nodes?",
      options: [
        "Only the next node",
        "Only the previous node",
        "Previous and next nodes",
        "Only the root node"
      ],
      answer: "Previous and next nodes",
      explanation: "A doubly linked list node normally stores references to both the previous and next nodes."
    },

    // Q31
    {
      question: "What is the main advantage of a linked list over an array for insertion?",
      options: [
        "It always uses less memory",
        "Insertion can be done without shifting all following elements",
        "It provides faster random access",
        "It automatically sorts elements"
      ],
      answer: "Insertion can be done without shifting all following elements",
      explanation: "Linked lists can change links to insert nodes without shifting the remaining elements."
    },

    // Q32
    {
      question: "Which condition is called stack overflow?",
      options: [
        "Removing from an empty stack",
        "Adding to a full fixed-size stack",
        "Searching a stack",
        "Reading the top element"
      ],
      answer: "Adding to a full fixed-size stack",
      explanation: "Stack overflow occurs when an attempt is made to add an element to a full fixed-size stack."
    },

    // Q33
    {
      question: "Which condition is called stack underflow?",
      options: [
        "Adding to an empty stack",
        "Removing from an empty stack",
        "Searching a full stack",
        "Adding two elements"
      ],
      answer: "Removing from an empty stack",
      explanation: "Stack underflow occurs when a removal operation is attempted on an empty stack."
    },

    // Q34
    {
      question: "Which operation is commonly used to view the top element of a stack without removing it?",
      options: ["Push", "Pop", "Peek", "Enqueue"],
      answer: "Peek",
      explanation: "Peek returns or views the top element without removing it."
    },

    // Q35
    {
      question: "Which operation is used to view the front element of a queue without removing it?",
      options: ["Peek", "Push", "Pop", "Insert"],
      answer: "Peek",
      explanation: "Peek can be used to inspect the front element without removing it, depending on the queue implementation."
    },

    // Q36
    {
      question: "Which sorting algorithm divides the array into two halves and recursively sorts them?",
      options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Linear Search"],
      answer: "Merge Sort",
      explanation: "Merge sort divides the data into smaller parts, sorts them, and merges the sorted parts."
    },

    // Q37
    {
      question: "What is the typical time complexity of Merge Sort?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
      answer: "O(n log n)",
      explanation: "Merge sort divides the input into logarithmic levels and processes n elements at each level."
    },

    // Q38
    {
      question: "Which sorting algorithm uses a pivot element to partition the array?",
      options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
      answer: "Quick Sort",
      explanation: "Quick sort selects a pivot and partitions the array around the pivot."
    },

    // Q39
    {
      question: "Which sorting algorithm builds a sorted portion one element at a time?",
      options: ["Insertion Sort", "Merge Sort", "Quick Sort", "Heap Sort"],
      answer: "Insertion Sort",
      explanation: "Insertion sort builds the sorted portion by inserting each new element into its proper position."
    },

    // Q40
    {
      question: "What is the worst-case time complexity of Bubble Sort?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      answer: "O(n²)",
      explanation: "In the worst case, Bubble Sort performs comparisons across multiple passes, resulting in O(n²) time."
    },

    // Q41
    {
      question: "What is the purpose of a hash table?",
      options: [
        "To store data using key-value mapping",
        "To represent only hierarchical data",
        "To perform recursion",
        "To sort data automatically"
      ],
      answer: "To store data using key-value mapping",
      explanation: "A hash table stores data using keys and associated values for efficient lookup."
    },

    // Q42
    {
      question: "Which data structure is commonly used in Breadth-First Search (BFS)?",
      options: ["Stack", "Queue", "Heap", "Array only"],
      answer: "Queue",
      explanation: "BFS uses a queue to process vertices in the order they are discovered."
    },

    // Q43
    {
      question: "Which data structure is commonly associated with Depth-First Search (DFS)?",
      options: ["Queue", "Stack", "HashMap", "Priority Queue"],
      answer: "Stack",
      explanation: "DFS can be implemented using a stack or recursion, which uses the call stack."
    },

    // Q44
    {
      question: "What is a leaf node in a tree?",
      options: [
        "A node with no children",
        "A node with no parent",
        "The root node",
        "The largest node"
      ],
      answer: "A node with no children",
      explanation: "A leaf node is a node that does not have any children."
    },

    // Q45
    {
      question: "What is the height of a tree related to?",
      options: [
        "The number of edges on the longest root-to-leaf path",
        "The total number of nodes only",
        "The number of leaf nodes only",
        "The number of roots"
      ],
      answer: "The number of edges on the longest root-to-leaf path",
      explanation: "Tree height is commonly defined as the number of edges on the longest path from the root to a leaf."
    },

    // Q46
    {
      question: "In a Binary Search Tree, where are values smaller than a node generally stored?",
      options: [
        "In the left subtree",
        "In the right subtree",
        "Only at the root",
        "Outside the tree"
      ],
      answer: "In the left subtree",
      explanation: "In a Binary Search Tree, smaller values are generally placed in the left subtree."
    },

    // Q47
    {
      question: "In a Binary Search Tree, where are values greater than a node generally stored?",
      options: [
        "In the left subtree",
        "In the right subtree",
        "Only at the root",
        "In a queue"
      ],
      answer: "In the right subtree",
      explanation: "In a Binary Search Tree, greater values are generally placed in the right subtree."
    },

    // Q48
    {
      question: "Which data structure is commonly used to implement a priority queue efficiently?",
      options: ["Heap", "Stack", "Linked List only", "Graph"],
      answer: "Heap",
      explanation: "A heap is commonly used to efficiently implement a priority queue."
    },

    // Q49
    {
      question: "What does O(n) mean in time complexity?",
      options: [
        "Constant time",
        "Logarithmic time",
        "Linear time",
        "Quadratic time"
      ],
      answer: "Linear time",
      explanation: "O(n) indicates that the running time grows approximately linearly with the input size."
    },

    // Q50
    {
      question: "What does O(n²) generally indicate?",
      options: [
        "Constant growth",
        "Logarithmic growth",
        "Linear growth",
        "Quadratic growth"
      ],
      answer: "Quadratic growth",
      explanation: "O(n²) indicates that the running time generally grows proportionally to the square of the input size."
    }
  ]
},
    Python: {
  title: "🐍 Python Practice",
  questions: [
    {
      question: "Which symbol is used to write a single-line comment in Python?",
      options: ["//", "#", "/*", "--"],
      answer: "#",
      explanation: "Python uses the # symbol for single-line comments."
    },

    {
      question: "Which function is used to get input from the user in Python?",
      options: ["scan()", "read()", "input()", "get()"],
      answer: "input()",
      explanation: "The input() function reads data entered by the user."
    },

    {
      question: "Which data type is used to store True or False?",
      options: ["int", "string", "bool", "float"],
      answer: "bool",
      explanation: "The bool data type stores True or False values in Python."
    },

    {
      question: "Which function is used to display output in Python?",
      options: ["display()", "print()", "output()", "show()"],
      answer: "print()",
      explanation: "The print() function is used to display output on the screen."
    },

    {
      question: "Which symbol is used for exponentiation in Python?",
      options: ["^", "**", "//", "%%"],
      answer: "**",
      explanation: "The ** operator is used for exponentiation. For example, 2 ** 3 gives 8."
    },

    {
      question: "What is the output of 10 // 3 in Python?",
      options: ["3", "3.33", "1", "0"],
      answer: "3",
      explanation: "The // operator performs floor division. 10 // 3 gives 3."
    },

    {
      question: "Which function is used to find the length of a list or string?",
      options: ["size()", "length()", "len()", "count()"],
      answer: "len()",
      explanation: "The len() function returns the number of items in a sequence."
    },

    {
      question: "Which of the following is a mutable data type in Python?",
      options: ["Tuple", "String", "List", "Integer"],
      answer: "List",
      explanation: "Lists are mutable, meaning their elements can be changed after creation."
    },

    {
      question: "Which collection stores data in key-value pairs?",
      options: ["List", "Tuple", "Set", "Dictionary"],
      answer: "Dictionary",
      explanation: "A dictionary stores data as key-value pairs."
    },

    {
      question: "Which brackets are used to create a list in Python?",
      options: ["()", "{}", "[]", "<>"],
      answer: "[]",
      explanation: "Square brackets [] are used to create a list in Python."
    },

    {
      question: "Which brackets are commonly used to create a tuple?",
      options: ["()", "[]", "{}", "<>"],
      answer: "()",
      explanation: "Parentheses () are commonly used to create tuples."
    },

    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "fun", "define"],
      answer: "def",
      explanation: "The def keyword is used to define a function in Python."
    },

    {
      question: "Which keyword is used for a conditional statement in Python?",
      options: ["if", "when", "check", "condition"],
      answer: "if",
      explanation: "The if keyword is used to execute code based on a condition."
    },

    {
      question: "Which keyword is used when the if condition is false and another condition needs to be checked?",
      options: ["else", "elif", "otherwise", "then"],
      answer: "elif",
      explanation: "The elif keyword allows another condition to be checked after an if condition."
    },

    {
      question: "Which loop is commonly used to iterate over a sequence in Python?",
      options: ["for", "switch", "repeat", "case"],
      answer: "for",
      explanation: "A for loop is commonly used to iterate over items in a sequence."
    },

    {
      question: "Which keyword is used to exit a loop?",
      options: ["stop", "exit", "break", "end"],
      answer: "break",
      explanation: "The break statement immediately terminates the loop."
    },

    {
      question: "Which keyword skips the current iteration of a loop?",
      options: ["skip", "continue", "pass", "next"],
      answer: "continue",
      explanation: "The continue statement skips the remaining part of the current iteration and moves to the next iteration."
    },

    {
      question: "Which keyword is used when a statement is intentionally left empty?",
      options: ["empty", "skip", "pass", "null"],
      answer: "pass",
      explanation: "The pass statement does nothing and is used as a placeholder."
    },

    {
      question: "Which operator checks whether two values are equal in Python?",
      options: ["=", "==", "===", "!="],
      answer: "==",
      explanation: "The == operator compares two values and checks whether they are equal."
    },

    {
      question: "Which method adds an element to the end of a Python list?",
      options: ["add()", "insert()", "append()", "push()"],
      answer: "append()",
      explanation: "The append() method adds an element to the end of a list."
    },

    // Q21
    {
      question: "Which data type is used to store decimal numbers in Python?",
      options: ["int", "float", "bool", "str"],
      answer: "float",
      explanation: "The float data type is used to store numbers containing decimal values."
    },

    // Q22
    {
      question: "Which function is used to check the data type of a variable?",
      options: ["type()", "datatype()", "checktype()", "typeof()"],
      answer: "type()",
      explanation: "The type() function returns the type of an object in Python."
    },

    // Q23
    {
      question: "Which function converts a string containing a whole number into an integer?",
      options: ["str()", "float()", "int()", "bool()"],
      answer: "int()",
      explanation: "The int() function converts a suitable value into an integer."
    },

    // Q24
    {
      question: "Which function converts a value into a string?",
      options: ["string()", "str()", "text()", "convert()"],
      answer: "str()",
      explanation: "The str() function converts a value into its string representation."
    },

    // Q25
    {
      question: "Which operator is used for floor division in Python?",
      options: ["/", "//", "%", "**"],
      answer: "//",
      explanation: "The // operator performs floor division."
    },

    // Q26
    {
      question: "Which operator returns the remainder after division?",
      options: ["/", "//", "%", "**"],
      answer: "%",
      explanation: "The % operator returns the remainder of a division operation."
    },

    // Q27
    {
      question: "Which keyword is used to combine multiple conditions when all conditions must be true?",
      options: ["or", "and", "not", "if"],
      answer: "and",
      explanation: "The and operator returns True when all connected conditions are True."
    },

    // Q28
    {
      question: "Which keyword is used when at least one of multiple conditions should be true?",
      options: ["and", "or", "not", "else"],
      answer: "or",
      explanation: "The or operator returns True when at least one connected condition is True."
    },

    // Q29
    {
      question: "Which keyword reverses a Boolean condition in Python?",
      options: ["reverse", "not", "opposite", "invert"],
      answer: "not",
      explanation: "The not operator reverses the Boolean value of a condition."
    },

    // Q30
    {
      question: "Which method removes and returns the last element of a list by default?",
      options: ["remove()", "delete()", "pop()", "clear()"],
      answer: "pop()",
      explanation: "The pop() method removes and returns an element, and by default it removes the last element."
    },

    // Q31
    {
      question: "Which method removes the first matching value from a Python list?",
      options: ["delete()", "remove()", "pop()", "clear()"],
      answer: "remove()",
      explanation: "The remove() method removes the first occurrence of the specified value from a list."
    },

    // Q32
    {
      question: "Which method inserts an element at a specific position in a list?",
      options: ["append()", "insert()", "add()", "push()"],
      answer: "insert()",
      explanation: "The insert() method adds an element at the specified index."
    },

    // Q33
    {
      question: "Which method sorts the elements of a list in place?",
      options: ["sort()", "order()", "arrange()", "sortedList()"],
      answer: "sort()",
      explanation: "The sort() method sorts the elements of a list in place."
    },

    // Q34
    {
      question: "Which function returns a sorted copy of an iterable?",
      options: ["sort()", "sorted()", "order()", "arrange()"],
      answer: "sorted()",
      explanation: "The sorted() function returns a new sorted list without modifying the original iterable."
    },

    // Q35
    {
      question: "Which collection type stores only unique elements?",
      options: ["List", "Tuple", "Set", "Dictionary"],
      answer: "Set",
      explanation: "A set stores unique elements and automatically removes duplicate values."
    },

    // Q36
    {
      question: "Which method adds an element to a set?",
      options: ["append()", "add()", "insert()", "push()"],
      answer: "add()",
      explanation: "The add() method is used to add an element to a set."
    },

    // Q37
    {
      question: "Which method returns all keys of a dictionary?",
      options: ["keys()", "items()", "values()", "getKeys()"],
      answer: "keys()",
      explanation: "The keys() method returns a view containing the dictionary's keys."
    },

    // Q38
    {
      question: "Which method returns all values of a dictionary?",
      options: ["keys()", "items()", "values()", "getValues()"],
      answer: "values()",
      explanation: "The values() method returns a view containing the dictionary's values."
    },

    // Q39
    {
      question: "Which method returns key-value pairs from a dictionary?",
      options: ["pairs()", "items()", "keys()", "entries()"],
      answer: "items()",
      explanation: "The items() method returns the dictionary's key-value pairs."
    },

    // Q40
    {
      question: "Which keyword is used to return a value from a function?",
      options: ["send", "return", "output", "give"],
      answer: "return",
      explanation: "The return statement sends a value back from a function to its caller."
    },

    // Q41
    {
      question: "What is the output of the following code?\n\nx = 10\nif x > 5:\n    print(\"Yes\")",
      options: ["Yes", "No", "10", "Error"],
      answer: "Yes",
      explanation: "Since 10 is greater than 5, the if condition is True and Yes is printed."
    },

    // Q42
    {
      question: "What is the output of the following code?\n\nfor i in range(3):\n    print(i)",
      options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
      answer: "0 1 2",
      explanation: "range(3) generates 0, 1 and 2."
    },

    // Q43
    {
      question: "What is the output of the following code?\n\nnumbers = [10, 20, 30]\nprint(numbers[1])",
      options: ["10", "20", "30", "1"],
      answer: "20",
      explanation: "List indexing starts at 0, so numbers[1] refers to the second element, 20."
    },

    // Q44
    {
      question: "What is the output of the following code?\n\nx = 5\nx += 3\nprint(x)",
      options: ["5", "8", "3", "15"],
      answer: "8",
      explanation: "x += 3 is equivalent to x = x + 3, so the value becomes 8."
    },

    // Q45
    {
      question: "What is the output of the following code?\n\nprint(2 ** 3)",
      options: ["6", "8", "9", "12"],
      answer: "8",
      explanation: "The ** operator performs exponentiation, so 2 raised to the power 3 is 8."
    },

    // Q46
    {
      question: "Which keyword is used to handle exceptions in Python?",
      options: ["try", "check", "handle", "exception"],
      answer: "try",
      explanation: "Python uses a try block together with except to handle exceptions."
    },

    // Q47
    {
      question: "Which block is used to handle an exception after a try block?",
      options: ["catch", "except", "error", "handle"],
      answer: "except",
      explanation: "The except block contains code that handles an exception raised in the try block."
    },

    // Q48
    {
      question: "Which keyword is used to create a class in Python?",
      options: ["class", "object", "struct", "define"],
      answer: "class",
      explanation: "The class keyword is used to define a class in Python."
    },

    // Q49
    {
      question: "Which Python feature allows a compact way to create a list from an iterable?",
      options: ["List comprehension", "List conversion", "List mapping", "List formatting"],
      answer: "List comprehension",
      explanation: "List comprehension provides a concise syntax for creating lists from iterables."
    },

    // Q50
    {
      question: "Which statement correctly describes Python?",
      options: [
        "Python requires every variable to have an explicit type declaration",
        "Python is dynamically typed",
        "Python does not support functions",
        "Python does not support object-oriented programming"
      ],
      answer: "Python is dynamically typed",
      explanation: "Python is dynamically typed, so variable types are determined at runtime."
    }
  ]
},
    SQL: {
  title: "🗄️ SQL / DBMS Practice",
  questions: [
    {
      question: "Which SQL command is used to retrieve data from a table?",
      options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
      answer: "SELECT",
      explanation: "SELECT is used to retrieve data from one or more tables."
    },

    {
      question: "Which key uniquely identifies each record in a table?",
      options: ["Primary Key", "Foreign Key", "Candidate Key", "Composite Key"],
      answer: "Primary Key",
      explanation: "A primary key uniquely identifies each record in a table."
    },

    {
      question: "Which SQL command is used to add new records to a table?",
      options: ["INSERT", "UPDATE", "CREATE", "ALTER"],
      answer: "INSERT",
      explanation: "INSERT is used to add new records to a table."
    },

    {
      question: "Which SQL command is used to modify existing records?",
      options: ["UPDATE", "ALTER", "INSERT", "MODIFY"],
      answer: "UPDATE",
      explanation: "UPDATE modifies existing records in a table."
    },

    {
      question: "Which SQL command is used to remove selected records from a table?",
      options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"],
      answer: "DELETE",
      explanation: "DELETE removes selected rows based on a condition."
    },

    {
      question: "Which command removes the entire table structure?",
      options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"],
      answer: "DROP",
      explanation: "DROP removes the table structure and its data."
    },

    {
      question: "Which clause is used to filter records?",
      options: ["WHERE", "ORDER BY", "GROUP BY", "HAVING"],
      answer: "WHERE",
      explanation: "WHERE filters records based on a specified condition."
    },

    {
      question: "Which clause is used to sort query results?",
      options: ["ORDER BY", "SORT BY", "GROUP BY", "WHERE"],
      answer: "ORDER BY",
      explanation: "ORDER BY sorts the result set in ascending or descending order."
    },

    {
      question: "Which keyword removes duplicate values from query results?",
      options: ["DISTINCT", "UNIQUE", "REMOVE", "DIFFERENT"],
      answer: "DISTINCT",
      explanation: "DISTINCT returns only unique values."
    },

    {
      question: "Which SQL function counts the number of rows?",
      options: ["COUNT()", "SUM()", "TOTAL()", "NUMBER()"],
      answer: "COUNT()",
      explanation: "COUNT() returns the number of rows that match the specified condition."
    },

    {
      question: "Which SQL function calculates the average value?",
      options: ["AVG()", "MEAN()", "AVERAGE()", "MID()"],
      answer: "AVG()",
      explanation: "AVG() calculates the average of numeric values."
    },

    {
      question: "Which SQL function returns the largest value?",
      options: ["MAX()", "LARGEST()", "HIGH()", "TOP()"],
      answer: "MAX()",
      explanation: "MAX() returns the highest value in a column."
    },

    {
      question: "Which SQL function returns the smallest value?",
      options: ["MIN()", "LOW()", "SMALLEST()", "BOTTOM()"],
      answer: "MIN()",
      explanation: "MIN() returns the lowest value in a column."
    },

    {
      question: "Which clause groups rows with the same values?",
      options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"],
      answer: "GROUP BY",
      explanation: "GROUP BY groups rows that have the same values in specified columns."
    },

    {
      question: "Which clause is used to filter grouped results?",
      options: ["HAVING", "WHERE", "GROUP BY", "FILTER"],
      answer: "HAVING",
      explanation: "HAVING filters groups after GROUP BY is applied."
    },

    {
      question: "Which key creates a relationship between two tables?",
      options: ["Foreign Key", "Primary Key", "Unique Key", "Super Key"],
      answer: "Foreign Key",
      explanation: "A foreign key references a key in another table and establishes a relationship."
    },

    {
      question: "Which JOIN returns matching records from both tables?",
      options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "CROSS JOIN"],
      answer: "INNER JOIN",
      explanation: "INNER JOIN returns rows where the join condition matches in both tables."
    },

    {
      question: "What does DBMS stand for?",
      options: [
        "Database Management System",
        "Data Backup Management System",
        "Database Monitoring Service",
        "Data Management Software"
      ],
      answer: "Database Management System",
      explanation: "DBMS stands for Database Management System."
    },

    {
      question: "Which normal form removes repeating groups and ensures atomic values?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: "1NF",
      explanation: "First Normal Form requires atomic values and removes repeating groups."
    },

    {
      question: "Which command is used to create a new table?",
      options: ["CREATE TABLE", "MAKE TABLE", "NEW TABLE", "ADD TABLE"],
      answer: "CREATE TABLE",
      explanation: "CREATE TABLE creates a new table with the specified columns and constraints."
    },

    {
      question: "Which SQL command is used to modify the structure of an existing table?",
      options: ["ALTER", "UPDATE", "CHANGE", "MODIFY"],
      answer: "ALTER",
      explanation: "ALTER is used to modify the structure of an existing table."
    },

    {
      question: "Which command removes all rows from a table while keeping its structure?",
      options: ["TRUNCATE", "DROP", "DELETE TABLE", "REMOVE"],
      answer: "TRUNCATE",
      explanation: "TRUNCATE removes all rows while keeping the table structure."
    },

    {
      question: "Which constraint prevents a column from containing NULL values?",
      options: ["NOT NULL", "UNIQUE", "CHECK", "DEFAULT"],
      answer: "NOT NULL",
      explanation: "NOT NULL ensures that a column must contain a value."
    },

    {
      question: "Which constraint ensures that all values in a column are different?",
      options: ["UNIQUE", "NOT NULL", "CHECK", "DEFAULT"],
      answer: "UNIQUE",
      explanation: "UNIQUE prevents duplicate values in a column."
    },

    {
      question: "Which constraint is used to enforce a condition on column values?",
      options: ["CHECK", "DEFAULT", "UNIQUE", "NOT NULL"],
      answer: "CHECK",
      explanation: "CHECK ensures that values satisfy a specified condition."
    },

    {
      question: "Which constraint provides a value automatically when no value is supplied?",
      options: ["DEFAULT", "CHECK", "UNIQUE", "NOT NULL"],
      answer: "DEFAULT",
      explanation: "DEFAULT assigns a predefined value when no value is provided."
    },

    {
      question: "Which JOIN returns all records from the left table and matching records from the right table?",
      options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "CROSS JOIN"],
      answer: "LEFT JOIN",
      explanation: "LEFT JOIN returns all rows from the left table and matching rows from the right table."
    },

    {
      question: "Which JOIN returns all records from the right table and matching records from the left table?",
      options: ["RIGHT JOIN", "LEFT JOIN", "INNER JOIN", "FULL JOIN"],
      answer: "RIGHT JOIN",
      explanation: "RIGHT JOIN returns all rows from the right table and matching rows from the left table."
    },

    {
      question: "Which JOIN produces the Cartesian product of two tables?",
      options: ["CROSS JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"],
      answer: "CROSS JOIN",
      explanation: "CROSS JOIN combines every row of the first table with every row of the second table."
    },

    {
      question: "Which operator is commonly used for pattern matching?",
      options: ["LIKE", "MATCH", "PATTERN", "SEARCH"],
      answer: "LIKE",
      explanation: "LIKE is used with wildcard characters for pattern matching."
    },

    {
      question: "Which wildcard represents zero or more characters in SQL?",
      options: ["%", "_", "*", "?"],
      answer: "%",
      explanation: "The percent sign (%) matches zero or more characters."
    },

    {
      question: "Which wildcard represents exactly one character in SQL?",
      options: ["_", "%", "*", "#"],
      answer: "_",
      explanation: "The underscore (_) represents exactly one character."
    },

    {
      question: "Which operator checks whether a value is within a specified range?",
      options: ["BETWEEN", "RANGE", "WITHIN", "LIMIT"],
      answer: "BETWEEN",
      explanation: "BETWEEN checks whether a value falls within a specified range."
    },

    {
      question: "Which operator checks whether a value matches any value in a given list?",
      options: ["IN", "ANY", "LIST", "MATCH"],
      answer: "IN",
      explanation: "IN checks whether a value is present in a specified list."
    },

    {
      question: "Which operator is used to check for NULL values?",
      options: ["IS NULL", "= NULL", "NULL =", "CHECK NULL"],
      answer: "IS NULL",
      explanation: "IS NULL is used to test whether a value is NULL."
    },

    {
      question: "Which SQL operator combines the results of two SELECT statements and removes duplicates?",
      options: ["UNION", "JOIN", "MERGE", "COMBINE"],
      answer: "UNION",
      explanation: "UNION combines compatible SELECT results and removes duplicate rows."
    },

    {
      question: "Which command permanently saves a transaction?",
      options: ["COMMIT", "SAVE", "STORE", "CONFIRM"],
      answer: "COMMIT",
      explanation: "COMMIT permanently saves the changes made during a transaction."
    },

    {
      question: "Which command is used to undo uncommitted transaction changes?",
      options: ["ROLLBACK", "UNDO", "REVERSE", "CANCEL"],
      answer: "ROLLBACK",
      explanation: "ROLLBACK undoes changes made in the current transaction that have not been committed."
    },

    {
      question: "Which ACID property means a transaction is completed completely or not at all?",
      options: ["Atomicity", "Consistency", "Isolation", "Durability"],
      answer: "Atomicity",
      explanation: "Atomicity ensures that a transaction is treated as one complete unit."
    },

    {
      question: "Which ACID property ensures that the database remains valid after a transaction?",
      options: ["Consistency", "Atomicity", "Isolation", "Durability"],
      answer: "Consistency",
      explanation: "Consistency ensures that a transaction moves the database from one valid state to another."
    },

    {
      question: "Which ACID property keeps concurrent transactions isolated from each other?",
      options: ["Isolation", "Atomicity", "Consistency", "Durability"],
      answer: "Isolation",
      explanation: "Isolation controls how concurrent transactions interact with each other."
    },

    {
      question: "Which ACID property ensures committed data is preserved?",
      options: ["Durability", "Atomicity", "Consistency", "Isolation"],
      answer: "Durability",
      explanation: "Durability ensures that committed changes survive system failures."
    },

    {
      question: "What is the main purpose of database normalization?",
      options: [
        "Reduce data redundancy",
        "Increase duplicate data",
        "Delete all relationships",
        "Remove primary keys"
      ],
      answer: "Reduce data redundancy",
      explanation: "Normalization organizes data to reduce redundancy and improve data integrity."
    },

    {
      question: "Which normal form removes partial dependency?",
      options: ["2NF", "1NF", "3NF", "4NF"],
      answer: "2NF",
      explanation: "Second Normal Form removes partial dependency on a composite key."
    },

    {
      question: "Which normal form removes transitive dependency?",
      options: ["3NF", "1NF", "2NF", "4NF"],
      answer: "3NF",
      explanation: "Third Normal Form removes transitive dependencies."
    },

    {
      question: "What is a database view?",
      options: [
        "A virtual table based on a query",
        "A physical copy of the database",
        "A primary key",
        "A database backup"
      ],
      answer: "A virtual table based on a query",
      explanation: "A view is a virtual table created from the result of a query."
    },

    {
      question: "What is the main purpose of an index in a database?",
      options: [
        "Improve data retrieval speed",
        "Increase data duplication",
        "Delete records automatically",
        "Replace all tables"
      ],
      answer: "Improve data retrieval speed",
      explanation: "Indexes can improve the speed of searching and retrieving records."
    },

    {
      question: "Which command is used to create an index?",
      options: ["CREATE INDEX", "MAKE INDEX", "ADD INDEX TABLE", "NEW INDEX"],
      answer: "CREATE INDEX",
      explanation: "CREATE INDEX is used to create an index on one or more columns."
    },

    {
      question: "What is a subquery?",
      options: [
        "A query written inside another query",
        "A duplicate table",
        "A database backup",
        "A type of primary key"
      ],
      answer: "A query written inside another query",
      explanation: "A subquery is a query nested inside another SQL query."
    },

    {
      question: "Which key can uniquely identify a record but may contain more attributes than necessary?",
      options: ["Super Key", "Foreign Key", "Foreign Key", "Alternate Key"],
      answer: "Super Key",
      explanation: "A super key is a set of one or more attributes that can uniquely identify a record."
    }

  ]
},
     OS: {
  title: "💻 Operating System Practice",
  questions: [
    {
      question: "Which of the following is an operating system?",
      options: ["Linux", "Oracle", "MySQL", "HTML"],
      answer: "Linux",
      explanation: "Linux is an operating system that manages computer hardware and software resources."
    },

    {
      question: "What is the main function of an operating system?",
      options: [
        "Manage hardware and software resources",
        "Create websites",
        "Design databases only",
        "Write application code automatically"
      ],
      answer: "Manage hardware and software resources",
      explanation: "An operating system manages hardware resources and provides services for application programs."
    },

    {
      question: "Which OS component manages processes?",
      options: ["Process Manager", "File Manager", "Compiler", "Text Editor"],
      answer: "Process Manager",
      explanation: "The process manager handles process creation, scheduling and termination."
    },

    {
      question: "What is a process?",
      options: [
        "A program in execution",
        "A file stored on disk",
        "A hardware device",
        "A programming language"
      ],
      answer: "A program in execution",
      explanation: "A process is a program that is currently being executed."
    },

    {
      question: "Which scheduling algorithm executes processes in the order they arrive?",
      options: [
        "FCFS",
        "Round Robin",
        "SJF",
        "Priority Scheduling"
      ],
      answer: "FCFS",
      explanation: "First Come First Served executes processes according to their arrival order."
    },

    {
      question: "Which scheduling algorithm uses a time quantum?",
      options: [
        "Round Robin",
        "FCFS",
        "SJF",
        "Priority Scheduling"
      ],
      answer: "Round Robin",
      explanation: "Round Robin scheduling assigns each process a fixed time quantum."
    },

    {
      question: "What is a thread?",
      options: [
        "A lightweight unit of execution",
        "A type of hard disk",
        "A database table",
        "A network cable"
      ],
      answer: "A lightweight unit of execution",
      explanation: "A thread is a lightweight execution unit within a process."
    },

    {
      question: "What is deadlock?",
      options: [
        "A situation where processes wait indefinitely for resources",
        "A process completing normally",
        "A method of memory allocation",
        "A file management technique"
      ],
      answer: "A situation where processes wait indefinitely for resources",
      explanation: "Deadlock occurs when processes are permanently waiting for resources held by each other."
    },

    {
      question: "Which is a necessary condition for deadlock?",
      options: [
        "Mutual Exclusion",
        "Compilation",
        "Paging",
        "Spooling"
      ],
      answer: "Mutual Exclusion",
      explanation: "Mutual exclusion is one of the four necessary conditions for deadlock."
    },

    {
      question: "Which memory management technique divides memory into fixed-size pages?",
      options: [
        "Paging",
        "Segmentation",
        "Swapping",
        "Spooling"
      ],
      answer: "Paging",
      explanation: "Paging divides logical memory into fixed-size pages and physical memory into frames."
    },

    {
      question: "Which memory management technique divides memory into logical segments?",
      options: [
        "Segmentation",
        "Paging",
        "Caching",
        "Spooling"
      ],
      answer: "Segmentation",
      explanation: "Segmentation divides memory according to logical units such as code, data and stack."
    },

    {
      question: "What is virtual memory?",
      options: [
        "A technique that allows disk space to extend available memory",
        "A type of CPU",
        "A physical RAM chip",
        "A network protocol"
      ],
      answer: "A technique that allows disk space to extend available memory",
      explanation: "Virtual memory allows programs to use more memory than the available physical RAM by using secondary storage."
    },

    {
      question: "Which memory is closest to the CPU?",
      options: [
        "Cache Memory",
        "Hard Disk",
        "DVD",
        "USB Drive"
      ],
      answer: "Cache Memory",
      explanation: "Cache memory is located close to the CPU and provides fast access to frequently used data."
    },

    {
      question: "What is context switching?",
      options: [
        "Switching the CPU from one process or thread to another",
        "Changing a file name",
        "Changing an IP address",
        "Formatting a disk"
      ],
      answer: "Switching the CPU from one process or thread to another",
      explanation: "Context switching saves the state of one process and loads the state of another."
    },

    {
      question: "What manages files and directories in an operating system?",
      options: [
        "File System",
        "Process Scheduler",
        "Compiler",
        "CPU"
      ],
      answer: "File System",
      explanation: "The file system organizes and manages files and directories on storage devices."
    },

    {
      question: "What is multitasking?",
      options: [
        "Running multiple tasks seemingly at the same time",
        "Running only one program",
        "Deleting multiple files",
        "Connecting multiple computers"
      ],
      answer: "Running multiple tasks seemingly at the same time",
      explanation: "Multitasking allows the operating system to manage multiple tasks by rapidly switching CPU execution."
    },

    {
      question: "An operating system is classified as which type of software?",
      options: [
        "System Software",
        "Application Software",
        "Utility File",
        "Programming Language"
      ],
      answer: "System Software",
      explanation: "An operating system is system software that manages computer resources."
    },

    {
      question: "What is a system call?",
      options: [
        "An interface between an application and the operating system",
        "A telephone call",
        "A network cable",
        "A database command"
      ],
      answer: "An interface between an application and the operating system",
      explanation: "System calls allow programs to request services from the operating system."
    },

    {
      question: "Which mode has unrestricted access to system resources?",
      options: [
        "Kernel Mode",
        "User Mode",
        "Application Mode",
        "Normal Mode"
      ],
      answer: "Kernel Mode",
      explanation: "Kernel mode allows the operating system to execute privileged operations."
    },

    {
      question: "Which OS feature controls access to system resources?",
      options: [
        "Protection",
        "Compilation",
        "Formatting",
        "Rendering"
      ],
      answer: "Protection",
      explanation: "Protection mechanisms control access to system resources and help prevent unauthorized operations."
    },

    {
      question: "Which scheduling algorithm selects the process with the shortest burst time?",
      options: [
        "SJF",
        "FCFS",
        "Round Robin",
        "FIFO"
      ],
      answer: "SJF",
      explanation: "Shortest Job First selects the process with the shortest expected CPU burst."
    },

    {
      question: "Which scheduling algorithm assigns priorities to processes?",
      options: [
        "Priority Scheduling",
        "FCFS",
        "Round Robin",
        "FIFO"
      ],
      answer: "Priority Scheduling",
      explanation: "Priority scheduling selects processes based on their assigned priority."
    },

    {
      question: "What is starvation in operating systems?",
      options: [
        "A process waits for a very long time because other processes keep getting resources",
        "A process finishes successfully",
        "A system starts normally",
        "A file is deleted"
      ],
      answer: "A process waits for a very long time because other processes keep getting resources",
      explanation: "Starvation occurs when a process is repeatedly denied the resources or CPU time it needs."
    },

    {
      question: "Which synchronization mechanism is commonly used to control access to shared resources?",
      options: [
        "Semaphore",
        "Compiler",
        "Loader",
        "Cache"
      ],
      answer: "Semaphore",
      explanation: "Semaphores are synchronization tools used to control access to shared resources."
    },

    {
      question: "What is a critical section?",
      options: [
        "A part of a program that accesses shared resources",
        "A part of the hard disk",
        "A CPU register",
        "A network packet"
      ],
      answer: "A part of a program that accesses shared resources",
      explanation: "A critical section contains code that accesses shared data or resources and must be properly synchronized."
    },

    {
      question: "What is a race condition?",
      options: [
        "A situation where the result depends on the timing of concurrent operations",
        "A CPU scheduling algorithm",
        "A memory allocation method",
        "A file system"
      ],
      answer: "A situation where the result depends on the timing of concurrent operations",
      explanation: "A race condition occurs when concurrent operations access shared data and the result depends on their execution order."
    },

    {
      question: "What is swapping?",
      options: [
        "Moving processes between main memory and secondary storage",
        "Changing file names",
        "Changing CPU architecture",
        "Deleting processes"
      ],
      answer: "Moving processes between main memory and secondary storage",
      explanation: "Swapping moves processes between RAM and secondary storage to manage memory."
    },

    {
      question: "What is fragmentation?",
      options: [
        "Wasted memory space caused by inefficient memory allocation",
        "A CPU scheduling method",
        "A file encryption method",
        "A network protocol"
      ],
      answer: "Wasted memory space caused by inefficient memory allocation",
      explanation: "Fragmentation occurs when available memory is divided into unusable or inefficiently sized portions."
    },

    {
      question: "Which fragmentation occurs when free memory is scattered between allocated blocks?",
      options: [
        "External Fragmentation",
        "Internal Fragmentation",
        "Logical Fragmentation",
        "Virtual Fragmentation"
      ],
      answer: "External Fragmentation",
      explanation: "External fragmentation occurs when free memory exists between allocated memory blocks."
    },

    {
      question: "Which fragmentation occurs when allocated memory contains unused space inside a block?",
      options: [
        "Internal Fragmentation",
        "External Fragmentation",
        "Logical Fragmentation",
        "Virtual Fragmentation"
      ],
      answer: "Internal Fragmentation",
      explanation: "Internal fragmentation occurs when allocated blocks contain unused space."
    },

    {
      question: "What is a page fault?",
      options: [
        "It occurs when a required page is not currently in main memory",
        "It occurs when the CPU stops permanently",
        "It occurs when a file is deleted",
        "It occurs when a process terminates normally"
      ],
      answer: "It occurs when a required page is not currently in main memory",
      explanation: "A page fault occurs when a process references a page that is not currently available in physical memory."
    },

    {
      question: "Which page replacement algorithm removes the least recently used page?",
      options: [
        "LRU",
        "FIFO",
        "FCFS",
        "SJF"
      ],
      answer: "LRU",
      explanation: "Least Recently Used replaces the page that has not been used for the longest time."
    },

    {
      question: "Which page replacement algorithm removes the page that entered memory first?",
      options: [
        "FIFO",
        "LRU",
        "SJF",
        "Round Robin"
      ],
      answer: "FIFO",
      explanation: "First In First Out removes the page that has been in memory for the longest time."
    },

    {
      question: "What is the kernel?",
      options: [
        "The core component of an operating system",
        "A text editor",
        "A database",
        "A programming language"
      ],
      answer: "The core component of an operating system",
      explanation: "The kernel is the core part of the operating system that manages hardware and system resources."
    },

    {
      question: "What is booting?",
      options: [
        "The process of starting a computer and loading the operating system",
        "Deleting the operating system",
        "Installing a printer",
        "Creating a database"
      ],
      answer: "The process of starting a computer and loading the operating system",
      explanation: "Booting is the process of starting the computer and loading the operating system into memory."
    },

    {
      question: "What is spooling?",
      options: [
        "Storing data temporarily so devices can process it later",
        "Deleting temporary files",
        "Encrypting a hard disk",
        "Scheduling CPU processes"
      ],
      answer: "Storing data temporarily so devices can process it later",
      explanation: "Spooling stores data temporarily, commonly for devices such as printers."
    },

    {
      question: "Which operating system is designed for real-time applications?",
      options: [
        "Real-Time Operating System",
        "Batch Operating System",
        "Distributed Operating System",
        "Network Operating System"
      ],
      answer: "Real-Time Operating System",
      explanation: "A real-time operating system is designed to respond to events within specified timing constraints."
    },

    {
      question: "What is a device driver?",
      options: [
        "Software that allows the OS to communicate with hardware",
        "A hardware component",
        "A database table",
        "A programming language"
      ],
      answer: "Software that allows the OS to communicate with hardware",
      explanation: "A device driver provides the software interface needed for the operating system to control hardware devices."
    },

    {
      question: "Which of the following is NOT a common process state?",
      options: [
        "Compiling",
        "Ready",
        "Running",
        "Waiting"
      ],
      answer: "Compiling",
      explanation: "Ready, running and waiting are common process states. Compiling is an operation, not a standard process state."
    },

    {
      question: "What is IPC in operating systems?",
      options: [
        "Inter-Process Communication",
        "Internal Process Control",
        "Internet Process Connection",
        "Input Process Communication"
      ],
      answer: "Inter-Process Communication",
      explanation: "IPC allows processes to communicate and exchange data with each other."
    },

    {
      question: "Which IPC mechanism allows communication through a temporary communication channel?",
      options: [
        "Pipe",
        "Cache",
        "Register",
        "Compiler"
      ],
      answer: "Pipe",
      explanation: "A pipe is an IPC mechanism that allows data to flow between processes."
    },

    {
      question: "What is thrashing?",
      options: [
        "Excessive paging that reduces system performance",
        "A CPU scheduling method",
        "A file compression technique",
        "A type of process termination"
      ],
      answer: "Excessive paging that reduces system performance",
      explanation: "Thrashing occurs when the system spends excessive time handling page faults instead of executing useful work."
    },

    {
      question: "Which of the following is one of the four necessary conditions for deadlock?",
      options: [
        "Hold and Wait",
        "Compilation",
        "Caching",
        "Spooling"
      ],
      answer: "Hold and Wait",
      explanation: "Hold and wait is one of the four necessary conditions for deadlock."
    },

    {
      question: "Which deadlock condition means resources cannot be forcibly taken from a process?",
      options: [
        "No Preemption",
        "Mutual Exclusion",
        "Circular Wait",
        "Hold and Wait"
      ],
      answer: "No Preemption",
      explanation: "No preemption means a resource cannot be forcibly removed from a process holding it."
    },

    {
      question: "Which deadlock condition involves processes waiting for resources held by each other in a cycle?",
      options: [
        "Circular Wait",
        "No Preemption",
        "Mutual Exclusion",
        "Hold and Wait"
      ],
      answer: "Circular Wait",
      explanation: "Circular wait occurs when processes form a cycle where each waits for a resource held by another process."
    },

    {
      question: "Which algorithm is used for deadlock avoidance?",
      options: [
        "Banker's Algorithm",
        "Binary Search",
        "Merge Sort",
        "Round Robin"
      ],
      answer: "Banker's Algorithm",
      explanation: "Banker's Algorithm is a well-known deadlock avoidance algorithm."
    },

    {
      question: "What is multiprocessing?",
      options: [
        "Using multiple processors or CPU cores to execute processes",
        "Running only one process",
        "Managing files",
        "Connecting two networks"
      ],
      answer: "Using multiple processors or CPU cores to execute processes",
      explanation: "Multiprocessing uses multiple processors or CPU cores to execute processes concurrently."
    },

    {
      question: "What is a distributed operating system?",
      options: [
        "An OS that manages a group of networked computers as a coordinated system",
        "An OS used only on mobile phones",
        "A single-user operating system",
        "A file compression program"
      ],
      answer: "An OS that manages a group of networked computers as a coordinated system",
      explanation: "A distributed operating system coordinates resources and activities across multiple connected computers."
    },

    {
      question: "Which technique prevents two processes from entering a critical section at the same time?",
      options: [
        "Mutual Exclusion",
        "Paging",
        "Spooling",
        "Swapping"
      ],
      answer: "Mutual Exclusion",
      explanation: "Mutual exclusion ensures that only one process accesses a critical section at a time."
    },
    {
  question: "What is preemptive scheduling?",
  options: [
    "A scheduling method where the OS can interrupt a running process",
    "A method where a process always runs until completion",
    "A method used only for memory allocation",
    "A method used to manage files"
  ],
  answer: "A scheduling method where the OS can interrupt a running process",
  explanation: "Preemptive scheduling allows the operating system to interrupt a running process and allocate the CPU to another process."
}

  ]
},
    CN: {
  title: "🌐 Computer Networks Practice",
  questions: [
    {
      question: "What does IP stand for?",
      options: [
        "Internet Protocol",
        "Internet Process",
        "Internal Protocol",
        "Internet Program"
      ],
      answer: "Internet Protocol",
      explanation: "IP stands for Internet Protocol and is used for addressing and routing packets."
    },

    {
      question: "Which device forwards packets between different networks?",
      options: [
        "Router",
        "Switch",
        "Hub",
        "Repeater"
      ],
      answer: "Router",
      explanation: "A router connects different networks and forwards packets between them."
    },

    {
      question: "Which protocol is used for secure web communication?",
      options: [
        "HTTPS",
        "HTTP",
        "FTP",
        "SMTP"
      ],
      answer: "HTTPS",
      explanation: "HTTPS provides secure HTTP communication using encryption."
    },

    {
      question: "Which protocol is mainly used to transfer web pages?",
      options: [
        "HTTP",
        "FTP",
        "SMTP",
        "DNS"
      ],
      answer: "HTTP",
      explanation: "HTTP is the standard protocol used to transfer web resources."
    },

    {
      question: "Which protocol converts domain names into IP addresses?",
      options: [
        "DNS",
        "DHCP",
        "FTP",
        "ARP"
      ],
      answer: "DNS",
      explanation: "DNS translates domain names such as example.com into IP addresses."
    },

    {
      question: "Which protocol is mainly used for sending emails?",
      options: [
        "SMTP",
        "FTP",
        "HTTP",
        "DNS"
      ],
      answer: "SMTP",
      explanation: "SMTP is used to send email messages between mail clients and servers."
    },

    {
      question: "Which protocol is used for transferring files?",
      options: [
        "FTP",
        "SMTP",
        "DNS",
        "ARP"
      ],
      answer: "FTP",
      explanation: "FTP stands for File Transfer Protocol and is used for file transfer."
    },

    {
      question: "Which OSI layer is responsible for routing?",
      options: [
        "Network Layer",
        "Transport Layer",
        "Data Link Layer",
        "Physical Layer"
      ],
      answer: "Network Layer",
      explanation: "The Network Layer handles logical addressing and routing of packets."
    },

    {
      question: "How many layers are there in the OSI model?",
      options: [
        "7",
        "5",
        "6",
        "8"
      ],
      answer: "7",
      explanation: "The OSI reference model consists of seven layers."
    },

    {
      question: "Which OSI layer provides end-to-end communication?",
      options: [
        "Transport Layer",
        "Network Layer",
        "Session Layer",
        "Data Link Layer"
      ],
      answer: "Transport Layer",
      explanation: "The Transport Layer provides end-to-end communication between applications."
    },

    {
      question: "Which protocol provides reliable connection-oriented communication?",
      options: [
        "TCP",
        "UDP",
        "IP",
        "ICMP"
      ],
      answer: "TCP",
      explanation: "TCP provides reliable, connection-oriented and ordered data delivery."
    },

    {
      question: "Which protocol is connectionless and generally has lower overhead?",
      options: [
        "UDP",
        "TCP",
        "HTTP",
        "FTP"
      ],
      answer: "UDP",
      explanation: "UDP is connectionless and has less overhead than TCP."
    },

    {
      question: "What does LAN stand for?",
      options: [
        "Local Area Network",
        "Large Area Network",
        "Local Access Network",
        "Linked Area Network"
      ],
      answer: "Local Area Network",
      explanation: "LAN is a network covering a relatively small geographical area."
    },

    {
      question: "What does WAN stand for?",
      options: [
        "Wide Area Network",
        "Wireless Access Network",
        "Web Area Network",
        "Wide Access Node"
      ],
      answer: "Wide Area Network",
      explanation: "WAN connects networks across large geographical areas."
    },

    {
      question: "Which device primarily forwards frames using MAC addresses?",
      options: [
        "Switch",
        "Router",
        "Modem",
        "Repeater"
      ],
      answer: "Switch",
      explanation: "A switch uses MAC addresses to forward frames within a local network."
    },

    {
      question: "Which address is associated with the Data Link Layer?",
      options: [
        "MAC Address",
        "IP Address",
        "Port Number",
        "Domain Name"
      ],
      answer: "MAC Address",
      explanation: "MAC addresses operate at the Data Link Layer."
    },

    {
      question: "Which protocol maps an IP address to a MAC address?",
      options: [
        "ARP",
        "DNS",
        "DHCP",
        "FTP"
      ],
      answer: "ARP",
      explanation: "ARP is used to discover the MAC address associated with an IPv4 address on a local network."
    },

    {
      question: "Which protocol automatically assigns IP addresses to devices?",
      options: [
        "DHCP",
        "DNS",
        "ARP",
        "HTTP"
      ],
      answer: "DHCP",
      explanation: "DHCP automatically provides network configuration such as IP addresses."
    },

    {
      question: "What is the main purpose of a firewall?",
      options: [
        "Control and filter network traffic",
        "Increase CPU speed",
        "Store files",
        "Create databases"
      ],
      answer: "Control and filter network traffic",
      explanation: "A firewall monitors and filters network traffic based on security rules."
    },

    {
      question: "Which topology connects devices to a central device?",
      options: [
        "Star",
        "Ring",
        "Bus",
        "Mesh"
      ],
      answer: "Star",
      explanation: "In a star topology, devices are connected to a central switch or hub."
    },

    {
      question: "Which OSI layer transmits raw bits over a physical medium?",
      options: [
        "Physical Layer",
        "Data Link Layer",
        "Network Layer",
        "Transport Layer"
      ],
      answer: "Physical Layer",
      explanation: "The Physical Layer transmits raw bits through the physical medium."
    },

    {
      question: "Which OSI layer is responsible for framing?",
      options: [
        "Data Link Layer",
        "Network Layer",
        "Transport Layer",
        "Session Layer"
      ],
      answer: "Data Link Layer",
      explanation: "The Data Link Layer organizes bits into frames and provides link-level delivery."
    },

    {
      question: "Which OSI layer handles data translation and encryption?",
      options: [
        "Presentation Layer",
        "Session Layer",
        "Network Layer",
        "Transport Layer"
      ],
      answer: "Presentation Layer",
      explanation: "The Presentation Layer handles data translation, formatting and functions such as encryption."
    },

    {
      question: "Which OSI layer establishes and manages sessions between applications?",
      options: [
        "Session Layer",
        "Transport Layer",
        "Network Layer",
        "Presentation Layer"
      ],
      answer: "Session Layer",
      explanation: "The Session Layer establishes, manages and terminates communication sessions."
    },

    {
      question: "Which OSI layer provides services directly to end-user applications?",
      options: [
        "Application Layer",
        "Presentation Layer",
        "Session Layer",
        "Transport Layer"
      ],
      answer: "Application Layer",
      explanation: "The Application Layer provides network services used by applications."
    },

    {
      question: "Which statement correctly compares TCP and UDP?",
      options: [
        "TCP is connection-oriented, while UDP is connectionless",
        "TCP is connectionless, while UDP is connection-oriented",
        "Both are always connection-oriented",
        "Both are always connectionless"
      ],
      answer: "TCP is connection-oriented, while UDP is connectionless",
      explanation: "TCP establishes a connection before communication, while UDP does not."
    },

    {
      question: "Which service translates a domain name into an IP address?",
      options: [
        "DNS",
        "DHCP",
        "ARP",
        "ICMP"
      ],
      answer: "DNS",
      explanation: "DNS resolves human-readable domain names to IP addresses."
    },

    {
      question: "Which protocol provides automatic network configuration to hosts?",
      options: [
        "DHCP",
        "DNS",
        "FTP",
        "SMTP"
      ],
      answer: "DHCP",
      explanation: "DHCP automatically assigns network configuration information to hosts."
    },

    {
      question: "Which protocol is commonly used for error reporting and diagnostic messages?",
      options: [
        "ICMP",
        "TCP",
        "FTP",
        "SMTP"
      ],
      answer: "ICMP",
      explanation: "ICMP is used for network error reporting and diagnostic functions."
    },

    {
      question: "What does a port number identify?",
      options: [
        "A network service or application",
        "A physical cable",
        "A MAC address",
        "A router"
      ],
      answer: "A network service or application",
      explanation: "Port numbers identify specific services or applications running on a host."
    },

    {
      question: "Which port is commonly associated with HTTP?",
      options: [
        "80",
        "21",
        "25",
        "443"
      ],
      answer: "80",
      explanation: "HTTP commonly uses port 80."
    },

    {
      question: "Which port is commonly associated with HTTPS?",
      options: [
        "443",
        "80",
        "21",
        "25"
      ],
      answer: "443",
      explanation: "HTTPS commonly uses port 443."
    },

    {
      question: "Which port is commonly associated with SMTP?",
      options: [
        "25",
        "80",
        "443",
        "53"
      ],
      answer: "25",
      explanation: "SMTP commonly uses port 25 for mail transfer."
    },

    {
      question: "What is the purpose of a subnet mask?",
      options: [
        "Separate the network and host portions of an IP address",
        "Encrypt network traffic",
        "Identify a MAC address",
        "Assign domain names"
      ],
      answer: "Separate the network and host portions of an IP address",
      explanation: "A subnet mask determines which part of an IP address represents the network and which part represents the host."
    },

    {
      question: "What is 127.0.0.1 commonly known as?",
      options: [
        "Loopback Address",
        "Broadcast Address",
        "Multicast Address",
        "Gateway Address"
      ],
      answer: "Loopback Address",
      explanation: "127.0.0.1 is the commonly used IPv4 loopback address for the local host."
    },

    {
      question: "Which of the following is a private IPv4 address?",
      options: [
        "192.168.1.10",
        "8.8.8.8",
        "1.1.1.1",
        "142.250.72.14"
      ],
      answer: "192.168.1.10",
      explanation: "192.168.0.0/16 is one of the private IPv4 address ranges."
    },

    {
      question: "Which technique divides data into packets and sends them through a network?",
      options: [
        "Packet Switching",
        "Circuit Switching",
        "Line Switching",
        "Message Formatting"
      ],
      answer: "Packet Switching",
      explanation: "Packet switching divides data into packets that can be transmitted independently through the network."
    },

    {
      question: "Which device regenerates signals to extend network transmission distance?",
      options: [
        "Repeater",
        "Router",
        "Switch",
        "Firewall"
      ],
      answer: "Repeater",
      explanation: "A repeater regenerates signals so they can travel longer distances."
    },

    {
      question: "Which device converts signals between different communication forms, commonly for Internet access?",
      options: [
        "Modem",
        "Switch",
        "Hub",
        "Repeater"
      ],
      answer: "Modem",
      explanation: "A modem modulates and demodulates signals to enable communication over certain transmission media."
    },

    {
      question: "Which topology provides a direct link between many pairs of devices?",
      options: [
        "Mesh",
        "Star",
        "Bus",
        "Ring"
      ],
      answer: "Mesh",
      explanation: "In a mesh topology, devices have direct links to multiple or all other devices."
    },

    {
      question: "What is bandwidth?",
      options: [
        "The data-carrying capacity of a communication link",
        "The delay of a network",
        "The physical length of a cable",
        "The number of routers"
      ],
      answer: "The data-carrying capacity of a communication link",
      explanation: "Bandwidth represents the capacity of a communication channel to carry data."
    },

    {
      question: "What is network latency?",
      options: [
        "The time taken for data to travel from source to destination",
        "The total number of devices",
        "The capacity of a network",
        "The size of a MAC address"
      ],
      answer: "The time taken for data to travel from source to destination",
      explanation: "Latency is the delay experienced while data travels through a network."
    },

    {
      question: "Which protocol provides secure file transfer using SSH?",
      options: [
        "SFTP",
        "FTP",
        "HTTP",
        "SMTP"
      ],
      answer: "SFTP",
      explanation: "SFTP provides secure file transfer over an SSH connection."
    },

    {
      question: "Which type of address uniquely identifies a network interface at the Data Link Layer?",
      options: [
        "MAC Address",
        "IP Address",
        "Port Number",
        "URL"
      ],
      answer: "MAC Address",
      explanation: "A MAC address identifies a network interface at the Data Link Layer."
    },

    {
      question: "Which protocol is commonly used by the ping utility?",
      options: [
        "ICMP",
        "TCP",
        "UDP",
        "FTP"
      ],
      answer: "ICMP",
      explanation: "Ping commonly uses ICMP Echo Request and Echo Reply messages."
    },

    {
      question: "What is the main purpose of routing?",
      options: [
        "Determine a path for packets between networks",
        "Encrypt files",
        "Assign MAC addresses",
        "Create web pages"
      ],
      answer: "Determine a path for packets between networks",
      explanation: "Routing determines suitable paths for forwarding packets toward their destination."
    },

    {
      question: "Which protocol is commonly used to download email messages from a mail server?",
      options: [
        "POP3",
        "SMTP",
        "DNS",
        "ARP"
      ],
      answer: "POP3",
      explanation: "POP3 is commonly used to retrieve email messages from a mail server."
    },

    {
      question: "Which email protocol keeps messages synchronized on the server?",
      options: [
        "IMAP",
        "POP3",
        "SMTP",
        "FTP"
      ],
      answer: "IMAP",
      explanation: "IMAP allows email messages to remain on the server and stay synchronized across devices."
    },

    {
      question: "Which topology connects each device to two neighboring devices, forming a loop?",
      options: [
        "Ring",
        "Star",
        "Mesh",
        "Bus"
      ],
      answer: "Ring",
      explanation: "In a ring topology, each device is connected to its two neighboring devices, forming a logical ring."
    },

    {
      question: "Which protocol is used to securely access a remote computer through a command-line interface?",
      options: [
        "SSH",
        "FTP",
        "HTTP",
        "SMTP"
      ],
      answer: "SSH",
      explanation: "SSH provides secure remote access and encrypted command-line communication."
    }

  ]
},
    Coding: {
  title: "💻 Coding Practice",
  questions: [
    {
      question: "Which operator is used to find the remainder of a division?",
      options: ["%", "/", "//", "*"],
      answer: "%",
      explanation: "The % operator returns the remainder after division."
    },

    {
      question: "Which loop is commonly used when the number of iterations is known?",
      options: ["for loop", "while loop", "do-while loop", "switch"],
      answer: "for loop",
      explanation: "A for loop is commonly used when the number of iterations is known."
    },

    {
      question: "Which condition checks whether a number is even?",
      options: ["n % 2 == 0", "n % 2 == 1", "n / 2 == 0", "n + 2 == 0"],
      answer: "n % 2 == 0",
      explanation: "An even number has a remainder of zero when divided by 2."
    },

    {
      question: "What is the output of 10 + 20?",
      options: ["30", "20", "10", "40"],
      answer: "30",
      explanation: "Adding 10 and 20 gives 30."
    },

    {
      question: "Which condition checks whether n is positive?",
      options: ["n > 0", "n < 0", "n == 0", "n != 0"],
      answer: "n > 0",
      explanation: "A number is positive when it is greater than zero."
    },

    {
      question: "Which statement is used for decision making?",
      options: ["if", "for", "break", "return"],
      answer: "if",
      explanation: "The if statement executes code when a specified condition is true."
    },

    {
      question: "Which keyword immediately exits a loop?",
      options: ["break", "continue", "return", "exitLoop"],
      answer: "break",
      explanation: "The break statement terminates the loop immediately."
    },

    {
      question: "Which keyword skips the current iteration of a loop?",
      options: ["continue", "break", "skip", "pass"],
      answer: "continue",
      explanation: "The continue statement skips the remaining statements in the current iteration."
    },

    {
      question: "What is the output of 5 * 4?",
      options: ["20", "9", "25", "16"],
      answer: "20",
      explanation: "Multiplying 5 by 4 gives 20."
    },

    {
      question: "Which operator checks equality in Java?",
      options: ["==", "=", "!=", "==="],
      answer: "==",
      explanation: "The == operator compares two values for equality in Java."
    },

    {
      question: "Which operator represents logical AND in Java?",
      options: ["&&", "||", "!", "&"],
      answer: "&&",
      explanation: "The && operator returns true when both conditions are true."
    },

    {
      question: "Which operator represents logical OR in Java?",
      options: ["||", "&&", "!", "|"],
      answer: "||",
      explanation: "The || operator returns true when at least one condition is true."
    },

    {
      question: "Which operator represents logical NOT in Java?",
      options: ["!", "&&", "||", "~"],
      answer: "!",
      explanation: "The ! operator reverses a boolean value."
    },

    {
      question: "Which loop checks its condition before executing the body?",
      options: ["while loop", "do-while loop", "switch", "if"],
      answer: "while loop",
      explanation: "A while loop checks its condition before executing the loop body."
    },

    {
      question: "Which data structure stores multiple values of the same type using indexes?",
      options: ["Array", "String", "Class", "Method"],
      answer: "Array",
      explanation: "An array stores multiple values of the same type and accesses them using indexes."
    },

    {
      question: "What is the first index of an array in Java?",
      options: ["0", "1", "-1", "2"],
      answer: "0",
      explanation: "Java arrays use zero-based indexing, so the first element is at index 0."
    },

    {
      question: "Which method is commonly used to compare String contents in Java?",
      options: ["equals()", "==()", "compare()", "same()"],
      answer: "equals()",
      explanation: "The equals() method compares the contents of two String objects."
    },

    {
      question: "Which keyword is used to return a value from a method?",
      options: ["return", "send", "output", "give"],
      answer: "return",
      explanation: "The return statement sends a value back from a method."
    },

    {
      question: "Which keyword is used to create an object in Java?",
      options: ["new", "object", "create", "class"],
      answer: "new",
      explanation: "The new keyword creates an object of a class."
    },

    {
      question: "Which method is the entry point of a Java program?",
      options: ["main()", "start()", "run()", "execute()"],
      answer: "main()",
      explanation: "The main() method is the standard entry point of a Java application."
    },

    {
      question: "Which keyword is used to define a class in Java?",
      options: ["class", "object", "struct", "define"],
      answer: "class",
      explanation: "The class keyword is used to declare a class in Java."
    },

    {
      question: "Which data type stores true or false values?",
      options: ["boolean", "int", "char", "float"],
      answer: "boolean",
      explanation: "The boolean data type stores either true or false."
    },

    {
      question: "What is the result of integer division 10 / 3 in Java?",
      options: ["3", "3.33", "4", "1"],
      answer: "3",
      explanation: "Integer division discards the fractional part, so 10 / 3 gives 3."
    },

    {
      question: "Which keyword is used to declare a constant in Java?",
      options: ["final", "constant", "static", "fixed"],
      answer: "final",
      explanation: "A final variable cannot be reassigned after it is initialized."
    },

    {
      question: "Which operator increases a variable by one?",
      options: ["++", "--", "+=", "**"],
      answer: "++",
      explanation: "The increment operator ++ increases a variable's value by one."
    },

    {
      question: "Which operator decreases a variable by one?",
      options: ["--", "++", "-=", "**"],
      answer: "--",
      explanation: "The decrement operator -- decreases a variable's value by one."
    },

    {
      question: "Which statement is used to select one option from multiple choices?",
      options: ["switch", "for", "while", "try"],
      answer: "switch",
      explanation: "The switch statement selects one block of code based on an expression's value."
    },

    {
      question: "Which block handles an exception in Java?",
      options: ["catch", "try", "throw", "finally"],
      answer: "catch",
      explanation: "The catch block handles an exception thrown from a try block."
    },

    {
      question: "Which keyword specifies that a method does not return a value?",
      options: ["void", "null", "empty", "none"],
      answer: "void",
      explanation: "The void return type indicates that a method does not return a value."
    },

    {
      question: "Which operator is used for addition?",
      options: ["+", "-", "*", "/"],
      answer: "+",
      explanation: "The + operator performs addition."
    },

    {
      question: "Which operator is used for multiplication?",
      options: ["*", "+", "/", "%"],
      answer: "*",
      explanation: "The * operator performs multiplication."
    },

    {
      question: "Which operator is used for division?",
      options: ["/", "*", "%", "-"],
      answer: "/",
      explanation: "The / operator performs division."
    },

    {
      question: "What is the output of 17 % 5?",
      options: ["2", "3", "5", "0"],
      answer: "2",
      explanation: "17 divided by 5 leaves a remainder of 2."
    },

    {
      question: "What is the main purpose of problem decomposition in programming?",
      options: [
        "Break a large problem into smaller manageable parts",
        "Make code longer",
        "Remove all variables",
        "Avoid testing"
      ],
      answer: "Break a large problem into smaller manageable parts",
      explanation: "Problem decomposition makes complex problems easier to understand and solve."
    },

    {
      question: "Which keyword is used to create a loop that executes while a condition is true?",
      options: ["while", "switch", "class", "catch"],
      answer: "while",
      explanation: "The while keyword creates a loop that continues while its condition is true."
    },

    {
      question: "Which statement is used to execute one block when a condition is true and another when it is false?",
      options: ["if-else", "switch-only", "for", "try"],
      answer: "if-else",
      explanation: "An if-else statement provides two execution paths based on a condition."
    },

    {
      question: "What is the output of 8 > 5?",
      options: ["true", "false", "8", "5"],
      answer: "true",
      explanation: "8 is greater than 5, so the comparison evaluates to true."
    },

    {
      question: "What is the output of 5 == 5?",
      options: ["true", "false", "5", "0"],
      answer: "true",
      explanation: "Both values are equal, so the equality comparison returns true."
    },

    {
      question: "Which data type is commonly used to store a whole number in Java?",
      options: ["int", "double", "char", "boolean"],
      answer: "int",
      explanation: "The int data type is commonly used to store whole numbers."
    },

    {
      question: "Which data type is commonly used to store decimal numbers in Java?",
      options: ["double", "int", "char", "boolean"],
      answer: "double",
      explanation: "The double data type stores floating-point decimal values."
    },

    {
      question: "Which keyword is used to create an inheritance relationship in Java?",
      options: ["extends", "inherits", "implements", "super"],
      answer: "extends",
      explanation: "A class uses extends to inherit from another class."
    },

    {
      question: "Which keyword is used when a Java class implements an interface?",
      options: ["implements", "extends", "interface", "inherits"],
      answer: "implements",
      explanation: "The implements keyword is used when a class implements an interface."
    },

    {
      question: "Which concept allows the same method name to have different implementations?",
      options: ["Polymorphism", "Encapsulation", "Inheritance", "Compilation"],
      answer: "Polymorphism",
      explanation: "Polymorphism allows the same interface or method concept to have different implementations."
    },

    {
      question: "Which concept hides internal implementation details?",
      options: ["Encapsulation", "Inheritance", "Polymorphism", "Iteration"],
      answer: "Encapsulation",
      explanation: "Encapsulation bundles data and methods together and controls access to internal details."
    },

    {
      question: "Which data structure follows LIFO order?",
      options: ["Stack", "Queue", "Array", "Linked List"],
      answer: "Stack",
      explanation: "A stack follows Last In First Out (LIFO)."
    },

    {
      question: "Which data structure follows FIFO order?",
      options: ["Queue", "Stack", "Tree", "Graph"],
      answer: "Queue",
      explanation: "A queue follows First In First Out (FIFO)."
    },

    {
      question: "What is the time complexity of accessing an element by index in an array?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      answer: "O(1)",
      explanation: "Array elements can be accessed directly using their index in constant time."
    },

    {
      question: "Which algorithm is commonly used to find an element in an unsorted array?",
      options: ["Linear Search", "Binary Search", "Merge Sort", "Heap Sort"],
      answer: "Linear Search",
      explanation: "Linear search checks elements one by one and works on unsorted arrays."
    },

    {
      question: "What condition must generally be satisfied before applying binary search?",
      options: [
        "The data must be sorted",
        "The data must contain only strings",
        "The data must contain duplicates",
        "The array must have exactly 10 elements"
      ],
      answer: "The data must be sorted",
      explanation: "Binary search relies on ordered data to repeatedly eliminate half of the search space."
    },

    {
      question: "Which sorting algorithm repeatedly compares adjacent elements?",
      options: ["Bubble Sort", "Binary Search", "Linear Search", "DFS"],
      answer: "Bubble Sort",
      explanation: "Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order."
    },
  ]
},
   Interview: {
  title: "HR / Interview Practice",
  questions: [

    {
      question: "What is the best way to answer 'Tell me about yourself'?",
      options: [
        "Give a brief introduction about your education, skills and career goal",
        "Talk only about your family",
        "Talk only about your hobbies",
        "Talk only about your marks"
      ],
      answer: "Give a brief introduction about your education, skills and career goal",
      explanation: "A good self-introduction should briefly cover your education, relevant skills and career goal."
    },

    {
      question: "Which is a good way to describe your strengths?",
      options: [
        "Mention relevant strengths with a short example",
        "Mention only your weaknesses",
        "Compare yourself negatively with others",
        "Give unrelated personal information"
      ],
      answer: "Mention relevant strengths with a short example",
      explanation: "Relevant strengths supported by examples make your answer more convincing."
    },

    {
      question: "How should you answer a question about your weakness?",
      options: [
        "Mention a genuine weakness and explain how you are improving it",
        "Say you have no weaknesses",
        "Blame your classmates",
        "Refuse to answer"
      ],
      answer: "Mention a genuine weakness and explain how you are improving it",
      explanation: "A professional answer shows self-awareness and explains the steps you are taking to improve."
    },

    {
      question: "What is a good answer to 'Why should we hire you?'",
      options: [
        "Connect your skills and willingness to learn with the job role",
        "Say you need the salary",
        "Say you are better than everyone",
        "Give no explanation"
      ],
      answer: "Connect your skills and willingness to learn with the job role",
      explanation: "Your answer should show how your skills and attitude can benefit the company."
    },

    {
      question: "What should you do if you do not know the answer to an interview question?",
      options: [
        "Be honest and explain what you know",
        "Give a random answer",
        "Stay silent for the entire interview",
        "Leave the interview"
      ],
      answer: "Be honest and explain what you know",
      explanation: "Being honest is better than giving incorrect information."
    },

    {
      question: "Why is it important to research a company before an interview?",
      options: [
        "It helps you understand the company, role and requirements",
        "It is only useful for experienced employees",
        "It is not necessary",
        "It helps you avoid answering questions"
      ],
      answer: "It helps you understand the company, role and requirements",
      explanation: "Company research helps you give relevant answers and shows genuine interest."
    },

    {
      question: "How should you answer 'Why did you choose Computer Science?'",
      options: [
        "Explain your interest in coding, technology or problem-solving",
        "Say you selected it randomly",
        "Talk only about your family",
        "Say you do not know"
      ],
      answer: "Explain your interest in coding, technology or problem-solving",
      explanation: "A strong answer connects your course choice with your interests and career goals."
    },

    {
      question: "What is a good way to answer 'What are your career goals?'",
      options: [
        "Explain realistic short-term and long-term professional goals",
        "Say you have no goals",
        "Mention only salary",
        "Give an unrelated personal goal"
      ],
      answer: "Explain realistic short-term and long-term professional goals",
      explanation: "A professional answer should show your career direction and growth plans."
    },

    {
      question: "How should you answer 'Where do you see yourself in five years?'",
      options: [
        "Describe your expected professional growth and responsibilities",
        "Say you have no plans",
        "Say you will leave immediately",
        "Talk only about your hobbies"
      ],
      answer: "Describe your expected professional growth and responsibilities",
      explanation: "The interviewer wants to understand your career direction and willingness to grow."
    },

    {
      question: "How should you answer a teamwork question?",
      options: [
        "Explain how you communicate, collaborate and contribute to a team",
        "Say you never work with others",
        "Blame your teammates",
        "Say teamwork is unnecessary"
      ],
      answer: "Explain how you communicate, collaborate and contribute to a team",
      explanation: "A good teamwork answer demonstrates communication, cooperation and responsibility."
    },

    {
      question: "What should you do before attending an interview?",
      options: [
        "Research the company, role and required skills",
        "Avoid learning about the company",
        "Study unrelated information",
        "Only prepare your clothes"
      ],
      answer: "Research the company, role and required skills",
      explanation: "Preparation helps you answer questions confidently and relevantly."
    },

    {
      question: "Which behavior is appropriate during an interview?",
      options: [
        "Listen carefully and answer clearly and respectfully",
        "Interrupt the interviewer frequently",
        "Use your phone during the interview",
        "Avoid listening to questions"
      ],
      answer: "Listen carefully and answer clearly and respectfully",
      explanation: "Professional communication includes active listening and respectful behavior."
    },

    {
      question: "What should you do if you need time to think about an answer?",
      options: [
        "Take a moment to think and then respond clearly",
        "Give a random answer immediately",
        "Leave the interview",
        "Refuse to answer"
      ],
      answer: "Take a moment to think and then respond clearly",
      explanation: "Taking a short moment to organize your thoughts is completely acceptable."
    },

    {
      question: "How should you explain your project in an interview?",
      options: [
        "Explain the problem, your role, technologies used and outcome",
        "Only say the project name",
        "Only describe the interface",
        "Say you copied the project"
      ],
      answer: "Explain the problem, your role, technologies used and outcome",
      explanation: "A project explanation should clearly communicate its purpose, your contribution and result."
    },

    {
      question: "If you worked in a team project, what should you explain?",
      options: [
        "Your specific contribution and how you worked with the team",
        "Only the team leader's work",
        "Nothing about your contribution",
        "Only the project title"
      ],
      answer: "Your specific contribution and how you worked with the team",
      explanation: "Interviewers want to understand your individual contribution and teamwork."
    },

    {
      question: "What is a professional way to answer an expected salary question?",
      options: [
        "Give a reasonable expectation and remain open to discussion",
        "Demand an unrealistic amount",
        "Refuse to discuss it",
        "Say salary is the only reason you want the job"
      ],
      answer: "Give a reasonable expectation and remain open to discussion",
      explanation: "A professional answer shows flexibility and awareness of the role."
    },

    {
      question: "What should you do at the end of an interview?",
      options: [
        "Thank the interviewer and ask an appropriate question if invited",
        "Leave without saying anything",
        "Immediately ask for selection",
        "Start an unrelated conversation"
      ],
      answer: "Thank the interviewer and ask an appropriate question if invited",
      explanation: "Thanking the interviewer creates a professional and respectful closing."
    },

    {
      question: "Which is a good question to ask an interviewer?",
      options: [
        "What skills are important for success in this role?",
        "How many holidays can I take tomorrow?",
        "Can I skip the interview process?",
        "Can I leave work whenever I want?"
      ],
      answer: "What skills are important for success in this role?",
      explanation: "Asking about important skills shows interest in understanding the role."
    },

    {
      question: "How should you describe your learning attitude?",
      options: [
        "Explain that you are willing to learn new technologies and improve",
        "Say you do not want to learn anything new",
        "Say learning is unnecessary",
        "Talk only about your marks"
      ],
      answer: "Explain that you are willing to learn new technologies and improve",
      explanation: "A willingness to learn is important for continuous professional development."
    },

    {
      question: "What should you do if you make a mistake while answering?",
      options: [
        "Acknowledge it and correct your answer",
        "Argue with the interviewer",
        "Blame someone else",
        "Continue with unrelated information"
      ],
      answer: "Acknowledge it and correct your answer",
      explanation: "Correcting a mistake demonstrates honesty and adaptability."
    },

    {
      question: "What is the best approach for technical interview questions?",
      options: [
        "Explain your reasoning clearly and give the answer you understand",
        "Memorize answers without understanding",
        "Guess every answer",
        "Avoid explaining your approach"
      ],
      answer: "Explain your reasoning clearly and give the answer you understand",
      explanation: "Technical interviews often evaluate both knowledge and problem-solving approach."
    },

    {
      question: "How should you answer a question about a difficult situation?",
      options: [
        "Explain the situation, your actions and the result",
        "Blame another person",
        "Say you have never faced difficulty",
        "Avoid giving details"
      ],
      answer: "Explain the situation, your actions and the result",
      explanation: "This structure clearly shows how you handled a challenging situation."
    },

    {
      question: "What does STAR stand for in behavioral interviews?",
      options: [
        "Situation, Task, Action, Result",
        "Skill, Technology, Answer, Review",
        "Situation, Technology, Action, Response",
        "Strength, Task, Ability, Reason"
      ],
      answer: "Situation, Task, Action, Result",
      explanation: "STAR is a common structure for answering behavioral interview questions."
    },

    {
      question: "How should you respond when asked about a failure?",
      options: [
        "Explain what happened, what you learned and how you improved",
        "Say you have never failed",
        "Blame the company",
        "Avoid answering"
      ],
      answer: "Explain what happened, what you learned and how you improved",
      explanation: "Showing learning and improvement demonstrates self-awareness and a growth mindset."
    },

    {
      question: "What should you highlight when discussing a college project?",
      options: [
        "Your role, technical skills, challenges and results",
        "Only the project title",
        "Only your teammates' work",
        "Only the project duration"
      ],
      answer: "Your role, technical skills, challenges and results",
      explanation: "These details help the interviewer understand your technical contribution and problem-solving ability."
    },
    {
  question: "How should you handle a disagreement with a teammate?",
  options: [
    "Discuss the issue respectfully and work toward a solution",
    "Start an argument",
    "Ignore the teammate completely",
    "Blame the teammate"
  ],
  answer: "Discuss the issue respectfully and work toward a solution",
  explanation: "Professional teamwork requires respectful communication and a focus on solving the problem."
},

{
  question: "What is important when answering behavioral interview questions?",
  options: [
    "Use specific examples from your experience",
    "Give only one-word answers",
    "Make up unrelated stories",
    "Avoid explaining your actions"
  ],
  answer: "Use specific examples from your experience",
  explanation: "Specific examples help the interviewer understand how you handled real situations."
},

{
  question: "How should you describe your biggest achievement?",
  options: [
    "Explain the achievement, your contribution and the result",
    "Only say that you are successful",
    "Compare yourself negatively with others",
    "Give no example"
  ],
  answer: "Explain the achievement, your contribution and the result",
  explanation: "A strong achievement answer explains what you accomplished and your contribution."
},

{
  question: "What should you review before a technical interview?",
  options: [
    "Core concepts, coding problems and your projects",
    "Only your hobbies",
    "Only general news",
    "Nothing"
  ],
  answer: "Core concepts, coding problems and your projects",
  explanation: "Technical preparation should include fundamentals, problem-solving and project knowledge."
},

{
  question: "How should you answer if you have not used a technology mentioned by the interviewer?",
  options: [
    "Be honest and say you are willing to learn it",
    "Pretend to have experience",
    "Give a random technical answer",
    "Say you will never learn it"
  ],
  answer: "Be honest and say you are willing to learn it",
  explanation: "Honesty and willingness to learn are better than claiming experience you do not have."
},

{
  question: "What is important during an online interview?",
  options: [
    "Check your internet, audio, camera and environment beforehand",
    "Join without testing anything",
    "Keep notifications on",
    "Choose a noisy place"
  ],
  answer: "Check your internet, audio, camera and environment beforehand",
  explanation: "Testing your setup helps prevent avoidable technical problems."
},

{
  question: "How should you communicate during an interview?",
  options: [
    "Speak clearly, confidently and professionally",
    "Speak as quickly as possible",
    "Use informal slang throughout",
    "Avoid answering directly"
  ],
  answer: "Speak clearly, confidently and professionally",
  explanation: "Clear and professional communication helps the interviewer understand your answers."
},

{
  question: "What should you do when an interviewer gives you feedback?",
  options: [
    "Listen carefully and respond positively",
    "Argue immediately",
    "Ignore the feedback",
    "Leave the interview"
  ],
  answer: "Listen carefully and respond positively",
  explanation: "Accepting feedback professionally shows maturity and willingness to improve."
},

{
  question: "What should you avoid unnecessarily discussing in an interview?",
  options: [
    "Negative personal comments about people or organizations",
    "Relevant technical skills",
    "Project experience",
    "Career goals"
  ],
  answer: "Negative personal comments about people or organizations",
  explanation: "Professional interviews should focus on relevant and constructive information."
},

{
  question: "What should you do if you do not understand an interview question?",
  options: [
    "Politely ask the interviewer to clarify the question",
    "Guess immediately",
    "Ignore the question",
    "Change the topic"
  ],
  answer: "Politely ask the interviewer to clarify the question",
  explanation: "Clarifying the question helps you understand exactly what the interviewer is asking."
},

{
  question: "Which quality is especially valuable for a fresher?",
  options: [
    "Willingness to learn and adapt",
    "Refusing new tasks",
    "Avoiding feedback",
    "Depending on others for every task"
  ],
  answer: "Willingness to learn and adapt",
  explanation: "Freshers need to learn new skills, adapt to situations and improve continuously."
},

{
  question: "How should you answer 'Why do you want to join our company?'",
  options: [
    "Connect your career goals and skills with the company's role and opportunities",
    "Say only that you need a job",
    "Say you selected the company randomly",
    "Only discuss salary"
  ],
  answer: "Connect your career goals and skills with the company's role and opportunities",
  explanation: "This shows that you understand the role and have a genuine career interest."
},

{
  question: "How can you demonstrate confidence in an interview?",
  options: [
    "Use professional body language and answer clearly",
    "Speak aggressively",
    "Interrupt the interviewer",
    "Avoid difficult questions"
  ],
  answer: "Use professional body language and answer clearly",
  explanation: "Confidence is shown through calm communication, appropriate body language and clear answers."
},

{
  question: "What should you include when discussing your skills?",
  options: [
    "Relevant skills with examples of how you have practiced or used them",
    "Every skill you have heard about",
    "Only unrelated skills",
    "No examples"
  ],
  answer: "Relevant skills with examples of how you have practiced or used them",
  explanation: "Examples from projects and practice make your skills more credible."
},

{
  question: "How should you respond to 'Do you have any questions for us?'",
  options: [
    "Ask a thoughtful question about the role, team or learning opportunities",
    "Always say no",
    "Ask only about holidays",
    "Ask whether the interview can be skipped"
  ],
  answer: "Ask a thoughtful question about the role, team or learning opportunities",
  explanation: "A thoughtful question shows interest in the position and company."
},

{
  question: "How should you answer questions about your academic performance?",
  options: [
    "Answer honestly and explain how you are improving your overall skills",
    "Blame your college",
    "Give false marks",
    "Refuse to discuss academics"
  ],
  answer: "Answer honestly and explain how you are improving your overall skills",
  explanation: "Honesty and continuous improvement demonstrate responsibility."
},

{
  question: "What should a fresher highlight when they have limited professional experience?",
  options: [
    "Projects, technical skills, learning and willingness to improve",
    "Fake professional experience",
    "Only personal problems",
    "Nothing"
  ],
  answer: "Projects, technical skills, learning and willingness to improve",
  explanation: "Projects and technical learning can demonstrate a fresher's practical ability and potential."
},

{
  question: "How should you explain your role in a project?",
  options: [
    "Clearly describe the tasks and features you personally worked on",
    "Claim every team member's work",
    "Only mention the project name",
    "Avoid discussing your contribution"
  ],
  answer: "Clearly describe the tasks and features you personally worked on",
  explanation: "The interviewer needs to understand your individual contribution."
},

{
  question: "What should you do if you cannot clearly understand the interviewer's accent?",
  options: [
    "Politely ask the interviewer to repeat or clarify the question",
    "Pretend that you understood",
    "Give an unrelated answer",
    "Remain silent"
  ],
  answer: "Politely ask the interviewer to repeat or clarify the question",
  explanation: "Politely requesting repetition is better than answering a question you did not understand."
},

{
  question: "How should you discuss a team achievement?",
  options: [
    "Explain the team result and clearly mention your contribution",
    "Claim that you did everything",
    "Say the team did nothing",
    "Only mention another person's contribution"
  ],
  answer: "Explain the team result and clearly mention your contribution",
  explanation: "A balanced answer recognizes teamwork while showing your individual contribution."
},

{
  question: "How should you discuss a gap in your learning or experience?",
  options: [
    "Explain it honestly and describe how you used the time to improve",
    "Create a false experience",
    "Blame someone else",
    "Refuse to answer"
  ],
  answer: "Explain it honestly and describe how you used the time to improve",
  explanation: "Honesty combined with evidence of improvement provides a professional response."
},

{
  question: "What is the best approach to an unexpected HR question?",
  options: [
    "Stay calm, understand the question and answer honestly",
    "Panic and stop speaking",
    "Give a random answer",
    "Argue with the interviewer"
  ],
  answer: "Stay calm, understand the question and answer honestly",
  explanation: "Remaining calm and honest demonstrates maturity and communication skills."
},

{
  question: "How should you prepare for common HR questions?",
  options: [
    "Understand your experiences and practice explaining them naturally",
    "Memorize every answer word for word",
    "Avoid practicing",
    "Copy another person's answers"
  ],
  answer: "Understand your experiences and practice explaining them naturally",
  explanation: "Understanding your own experiences allows you to answer naturally and confidently."
},

{
  question: "What is a good answer to 'What motivates you?'",
  options: [
    "Explain genuine factors such as learning, problem-solving and achieving goals",
    "Only mention salary",
    "Say nothing motivates you",
    "Give an unrelated answer"
  ],
  answer: "Explain genuine factors such as learning, problem-solving and achieving goals",
  explanation: "A strong motivation answer connects your genuine interests with professional growth."
},

{
  question: "How should you answer 'Are you willing to relocate?'",
  options: [
    "Give an honest answer based on your actual flexibility",
    "Always say yes even if it is impossible",
    "Refuse to answer",
    "Ask the interviewer to decide for you"
  ],
  answer: "Give an honest answer based on your actual flexibility",
  explanation: "Relocation preferences should be communicated honestly and professionally."
}
  ]
},
  };
const createInitialProgress = () => {
  const initialProgress = {};

  Object.keys(topics).forEach((topic) => {
    initialProgress[topic] = {
      attempted: 0,
      correct: 0,
      wrong: 0
    };
  });

  return initialProgress;
};


const [progress, setProgress] = useState(
  createInitialProgress
);

const [progressLoaded, setProgressLoaded] =
  useState(false);


// LOAD PROGRESS FROM MONGODB

useEffect(() => {
  const loadProgress = async () => {
    try {
      const userId =
        localStorage.getItem("careerTrackUserId");

      if (!userId) {
        console.error("User ID not found");
        setProgressLoaded(true);
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:5000/api/preparation/progress/${userId}`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load preparation progress"
        );
      }

      const data = await response.json();

      if (data && data.progress) {
        setProgress(data.progress);
      }

    } catch (error) {
      console.error(
        "Failed to load preparation progress:",
        error
      );

    } finally {
      setProgressLoaded(true);
    }
  };

  loadProgress();
}, []);


// START TOPIC

const startTopic = (topic) => {

  const shuffledQuestions =
    [...topics[topic].questions];

  for (
    let i = shuffledQuestions.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(Math.random() * (i + 1));

    [
      shuffledQuestions[i],
      shuffledQuestions[j]
    ] = [
      shuffledQuestions[j],
      shuffledQuestions[i]
    ];
  }

  setQuestions(shuffledQuestions);

  setSelectedTopic(topic);
  setCurrentQuestion(0);
  setSelectedAnswer("");
  setSubmitted(false);
  setScore(0);
};


// SELECT ANSWER

const handleAnswer = (answer) => {

  if (submitted) {
    return;
  }

  setSelectedAnswer(answer);
};


// SUBMIT ANSWER

const handleSubmit = async () => {

  if (!selectedAnswer) {
    alert("Please select an answer.");
    return;
  }

  const question =
    questions[currentQuestion];

  const isCorrect =
    selectedAnswer === question.answer;


  // UPDATE SCORE

  if (isCorrect) {
    setScore(
      (previous) => previous + 1
    );
  }


  // CREATE UPDATED PROGRESS

  const updatedProgress = {
    ...progress,

    [selectedTopic]: {
      ...progress[selectedTopic],

      attempted:
        progress[selectedTopic].attempted + 1,

      correct:
        progress[selectedTopic].correct +
        (isCorrect ? 1 : 0),

      wrong:
        progress[selectedTopic].wrong +
        (isCorrect ? 0 : 1)
    }
  };


  // UPDATE SCREEN

  setProgress(updatedProgress);


  // SAVE TO MONGODB

  try {

    const userId =
      localStorage.getItem(
        "careerTrackUserId"
      );

    if (!userId) {

      console.error(
        "User ID not found"
      );

    } else {

      const response = await fetch(
        `http://127.0.0.1:5000/api/preparation/progress/${userId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            progress: updatedProgress
          })
        }
      );


      if (!response.ok) {

        throw new Error(
          "Failed to save preparation progress"
        );
      }


      console.log(
        "Preparation progress saved to MongoDB"
      );
    }

  } catch (error) {

    console.error(
      "Failed to save preparation progress:",
      error
    );

    alert(
      "Progress could not be saved to server."
    );
  }


  // SHOW FEEDBACK

  setSubmitted(true);
};


// NEXT QUESTION

const handleNext = () => {

  const totalQuestions =
    questions.length;


  if (
    currentQuestion <
    totalQuestions - 1
  ) {

    setCurrentQuestion(
      (previous) =>
        previous + 1
    );

    setSelectedAnswer("");
    setSubmitted(false);

  } else {

    setCurrentQuestion(
      totalQuestions
    );
  }
};


// RESTART PRACTICE

const restartPractice = () => {

  if (selectedTopic) {

    const shuffledQuestions =
      [...topics[selectedTopic].questions];

    for (
      let i =
        shuffledQuestions.length - 1;
      i > 0;
      i--
    ) {

      const j =
        Math.floor(
          Math.random() * (i + 1)
        );

      [
        shuffledQuestions[i],
        shuffledQuestions[j]
      ] = [
        shuffledQuestions[j],
        shuffledQuestions[i]
      ];
    }

    setQuestions(
      shuffledQuestions
    );
  }


  setCurrentQuestion(0);
  setSelectedAnswer("");
  setSubmitted(false);
  setScore(0);
};


// BACK TO TOPICS

const backToTopics = () => {

  setSelectedTopic(null);
  setQuestions([]);
  setCurrentQuestion(0);
  setSelectedAnswer("");
  setSubmitted(false);
  setScore(0);
};


// CALCULATE OVERALL PROGRESS

const calculateOverallProgress = () => {

  let totalAttempted = 0;
  let totalQuestions = 0;

  Object.keys(topics).forEach(
    (topic) => {

      totalAttempted +=
        progress[topic]?.attempted || 0;

      totalQuestions +=
        topics[topic].questions.length;
    }
  );


  if (totalQuestions === 0) {
    return 0;
  }


  const percentage =
    Math.round(
      (totalAttempted /
        totalQuestions) *
        100
    );


  return Math.min(
    percentage,
    100
  );
};


const overallProgress =
  calculateOverallProgress();


return (

  <div className="preparation-page">

    {/* TOP BAR */}

    <div className="preparation-topbar">

      <button onClick={goDashboard}>
        ← Back to Dashboard
      </button>

    </div>


    {/* HEADER */}

    <div className="preparation-header">

      <h1>
        Placement Preparation 📚
      </h1>

      <p>
        Practice important placement topics
        and improve your technical skills.
      </p>

    </div>


    {/* TOPIC LIST */}

    {!selectedTopic && (

      <>

        {/* OVERALL PROGRESS */}

        <div className="overall-progress">

          <h2>
            Overall Preparation Progress
          </h2>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width:
                  `${overallProgress}%`
              }}
            ></div>

          </div>

          <p>
            {overallProgress}% Completed
          </p>

        </div>


        {/* PREPARATION LIST */}

        <div className="preparation-list">

          {Object.keys(topics).map(
            (topic) => {

              const topicProgress =
                progress[topic] || {
                  attempted: 0,
                  correct: 0,
                  wrong: 0
                };


              const totalQuestions =
                topics[topic]
                  .questions.length;


              const topicPercentage =
                totalQuestions === 0
                  ? 0
                  : Math.round(
                      (topicProgress.attempted /
                        totalQuestions) *
                        100
                    );


              return (

                <div
                  className="preparation-card"
                  key={topic}
                >

                  <h2>
                    {topics[topic].title}
                  </h2>

                  <p>
                    {totalQuestions}
                    {" "}Practice Questions
                  </p>


                  <p>
                    Attempted:{" "}
                    {topicProgress.attempted}
                  </p>

                  <p>
                    Correct:{" "}
                    {topicProgress.correct}
                  </p>

                  <p>
                    Wrong:{" "}
                    {topicProgress.wrong}
                  </p>


                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width:
                          `${Math.min(
                            topicPercentage,
                            100
                          )}%`
                      }}
                    ></div>

                  </div>


                  <p>
                    {Math.min(
                      topicPercentage,
                      100
                    )}% Completed
                  </p>


                  <button
                    onClick={() =>
                      startTopic(topic)
                    }
                  >
                    Start Practice →
                  </button>

                </div>

              );
            }
          )}

        </div>

      </>

    )}


    {/* PRACTICE */}

    {selectedTopic && (

      <div className="preparation-content">

        {/* TOPIC HEADER */}

        <div className="practice-header">

          <button onClick={backToTopics}>
            ← Back to Topics
          </button>

          <h2>
            {topics[selectedTopic].title}
          </h2>

        </div>


        {/* RESULT */}

        {currentQuestion >=
        questions.length ? (

          <div className="practice-result">

            <h2>
              🎉 Practice Completed!
            </h2>

            <p>
              Your Score
            </p>

            <strong>
              {score} / {questions.length}
            </strong>

            <p>
              Keep practicing to improve
              your placement preparation.
            </p>

            <button
              onClick={restartPractice}
            >
              🔄 Practice Again
            </button>

            <button
              onClick={backToTopics}
            >
              ← Back to Topics
            </button>

          </div>

        ) : (

          <>

            {/* QUESTION PROGRESS */}

            <div className="question-progress">

              <div className="progress-info">

                <span>
                  Question{" "}
                  {currentQuestion + 1}
                  {" "}of{" "}
                  {questions.length}
                </span>

                <strong>
                  Score: {score}
                </strong>

              </div>


              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      `${
                        ((currentQuestion + 1) /
                          questions.length) *
                        100
                      }%`
                  }}
                ></div>

              </div>

            </div>


            {/* QUESTION */}

            <div className="question-card">

              <h3>
                {currentQuestion + 1}.{" "}
                {
                  questions[
                    currentQuestion
                  ].question
                }
              </h3>


              {/* OPTIONS */}

              <div className="answer-options">

                {
                  questions[
                    currentQuestion
                  ].options.map(
                    (option, index) => {

                      const question =
                        questions[
                          currentQuestion
                        ];

                      let optionClass = "";


                      if (submitted) {

                        if (
                          option ===
                          question.answer
                        ) {

                          optionClass =
                            "correct-answer";

                        } else if (
                          option ===
                          selectedAnswer
                        ) {

                          optionClass =
                            "wrong-answer";
                        }

                      } else if (
                        option ===
                        selectedAnswer
                      ) {

                        optionClass =
                          "selected-answer";
                      }


                      return (

                        <button
                          key={index}
                          className={
                            `answer-option ${optionClass}`
                          }
                          onClick={() =>
                            handleAnswer(
                              option
                            )
                          }
                          disabled={submitted}
                        >

                          <span>
                            {String.fromCharCode(
                              65 + index
                            )}.
                          </span>

                          {option}

                        </button>

                      );

                    }
                  )
                }

              </div>


              {/* FEEDBACK */}

              {submitted && (

                <div
                  className={
                    selectedAnswer ===
                    questions[
                      currentQuestion
                    ].answer
                      ? "answer-feedback correct-feedback"
                      : "answer-feedback wrong-feedback"
                  }
                >

                  <strong>

                    {selectedAnswer ===
                    questions[
                      currentQuestion
                    ].answer
                      ? "✅ Correct!"
                      : "❌ Wrong!"}

                  </strong>


                  <p>

                    <b>
                      Correct Answer:
                    </b>{" "}

                    {
                      questions[
                        currentQuestion
                      ].answer
                    }

                  </p>


                  <p>
                    {
                      questions[
                        currentQuestion
                      ].explanation
                    }
                  </p>

                </div>

              )}


              {/* ACTION */}

              <div className="question-actions">

                {!submitted ? (

                  <button
                    onClick={handleSubmit}
                  >
                    Submit Answer
                  </button>

                ) : (

                  <button
                    onClick={handleNext}
                  >

                    {currentQuestion ===
                    questions.length - 1
                      ? "View Result →"
                      : "Next Question →"}

                  </button>

                )}

              </div>

            </div>

          </>

        )}

      </div>

    )}

  </div>

);

}

export default Preparation;