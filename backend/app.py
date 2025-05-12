from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import random

app = Flask(__name__)
CORS(app)

# Load and clean CSV data once when the server starts
df = pd.read_csv('movies_data.csv')

# Ensure required columns exist and drop rows with missing crucial fields
df = df.dropna(subset=['MovieID', 'Title', 'Release Date', 'Rating'])
df['Release Date'] = pd.to_datetime(df['Release Date'], errors='coerce')
df['Year'] = df['Release Date'].dt.year
df = df[df['Year'].notnull()]
df['Year'] = df['Year'].astype(int)

@app.route('/movies/random', methods=['GET'])
def get_random_movies():
    # Get up to 1000 random movies
    sample_size = min(500, len(df))
    random_movies = df.sample(n=sample_size)

    # Replace NaN with None so jsonify can handle it
    random_movies = random_movies.where(pd.notnull(random_movies), None)

    # Convert to list of dicts
    movie_list = random_movies.to_dict(orient='records')
    return jsonify(movie_list)

if __name__ == '__main__':
    app.run(debug=True)
