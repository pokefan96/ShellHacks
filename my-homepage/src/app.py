from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS

# Use the absolute path or correct relative path to CSV
csv_file_path = '/Users/aaronsteig/Documents/Documents - Aaron’s MacBook Air (2)/FALL 2023/personal/hackathon/ShellHacks/my-homepage/src/cleaned_credit_cards.csv'

# Load the CSV file
df = pd.read_csv(csv_file_path)

@app.route('/filter_cards', methods=['POST'])
def filter_cards():
    data = request.json  # Get the JSON data from the request
    
    # Extract credit score and income from the request
    user_credit_score = data.get('creditScore')
    user_income = data.get('yearlyIncome')

    # Validate inputs
    if not user_credit_score or not user_income:
        return jsonify({"error": "Missing input data"}), 400
    
    try:
        user_credit_score = int(user_credit_score)
        user_income = float(user_income)
    except ValueError:
        return jsonify({"error": "Invalid input data"}), 400

    # Clean and parse the 'Required FICO Score' and 'Estimated Minimum Income' columns
    df['Required FICO Score'] = df['Required FICO Score'].str.replace('+', '').astype(int)
    df['Estimated Minimum Income'] = df['Estimated Minimum Income'].str.replace('[$+,]', '', regex=True).astype(float)

    # Filter credit cards based on the user's credit score and income
    filtered_cards = df[
        (df['Required FICO Score'] <= user_credit_score) &
        (df['Estimated Minimum Income'] <= user_income)
    ].head(5)

    # Return the filtered results as JSON
    results = filtered_cards.to_dict(orient='records')
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
