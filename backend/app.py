from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import pandas as pd

app = Flask(__name__) 
CORS(app)

df = pd.read_csv('movies_data.csv')
df = df.dropna(subset=['MovieID', 'Title', 'Release Date', 'Rating', 'adult'])
df['Release Date'] = pd.to_datetime(df['Release Date'], errors='coerce')
df['Year'] = df['Release Date'].dt.year
df = df[df['Year'].notnull()]
df['Year'] = df['Year'].astype(int)
df = df[df['adult'] == False]

@app.route('/movies', methods=['GET'])
def get_random_movies():
    sample_size = min(100, len(df))
    random_movies = df.sample(n=sample_size)
    random_movies = random_movies.where(pd.notnull(random_movies), None)
    movie_list = random_movies.to_dict(orient='records')
    return jsonify(movie_list)

@app.route('/movie/<int:movie_id>', methods=['GET'])
def get_movie_by_id(movie_id):
    movie = df[df['MovieID'] == movie_id]
    if movie.empty:
        abort(404, description="Movie not found")
    movie_data = movie.iloc[0].where(pd.notnull(movie.iloc[0]), None).to_dict()
    return jsonify(movie_data)

@app.route('/movies/search', methods=['GET'])
def search_movies():
    query = request.args.get('query', '').lower()
    if not query:
        return jsonify([])
    results = df[
        (df['Title'].str.lower().str.contains(query, na=False) |
         df['Genres'].str.lower().str.contains(query, na=False))
    ]
    results = results.head(100)
    results = results.where(pd.notnull(results), None)
    movie_list = results.to_dict(orient='records')
    return jsonify(movie_list)

@app.route('/movies/genre/<genre>', methods=['GET'])
def get_movies_by_genre(genre):
    if genre.lower() == 'all':
        sample_size = min(100, len(df))
        movies = df.sample(n=sample_size)
    else:
        movies = df[df['Genres'].str.lower().str.contains(genre.lower(), na=False)]
        movies = movies.head(100)
    movies = movies.where(pd.notnull(movies), None)
    movie_list = movies.to_dict(orient='records')
    return jsonify(movie_list)

@app.route('/movies/genres', methods=['GET'])
def get_movies_by_multiple_genres():
    selected_genres = request.args.get('selected', '')
    if not selected_genres:
        return jsonify([])
    genres_list = selected_genres.split(',')
    filtered_movies = df.copy()
    for genre in genres_list:
        genre = genre.lower().strip()
        filtered_movies = filtered_movies[
            filtered_movies['Genres'].str.lower().str.contains(genre, na=False)
        ]
    filtered_movies = filtered_movies.head(100)
    filtered_movies = filtered_movies.where(pd.notnull(filtered_movies), None)
    movie_list = filtered_movies.to_dict(orient='records')
    return jsonify(movie_list)

if __name__ == '__main__':
    app.run(debug=True)
