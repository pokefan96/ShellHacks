import pandas as pd

# Load the CSV file
def load_credit_cards(csv_file_path):
    df = pd.read_csv(csv_file_path)
    return df

# Filter based on user input
def filter_credit_cards(df, user_credit_score, user_income):
    # Clean and parse the 'Required FICO Score' and 'Estimated Minimum Income' columns
    df['Required FICO Score'] = df['Required FICO Score'].str.replace('+', '').astype(int)
    df['Estimated Minimum Income'] = df['Estimated Minimum Income'].str.replace('[$+,]', '', regex=True).astype(float)
    
    # Filter credit cards based on the user's credit score and income
    filtered_cards = df[
        (df['Required FICO Score'] <= user_credit_score) &
        (df['Estimated Minimum Income'] <= user_income)
    ]
    
    # Return top 5 matching cards
    return filtered_cards.head(5)

def main():
    # Load the CSV file
    csv_file_path = 'ShellHacks/my-homepage/src/cleaned_credit_cards.csv'
    df = load_credit_cards(csv_file_path)
    
    # Example user inputs
    user_credit_score = 720  # Example credit score
    user_income = 40000  # Example income
    
    # Filter and return top 5 cards
    top_5_cards = filter_credit_cards(df, user_credit_score, user_income)
    
    # Display results
    if top_5_cards.empty:
        print("No matching credit cards found.")
    else:
        print("Top 5 credit cards matching your criteria:")
        print(top_5_cards)

if __name__ == "__main__":
    main()
