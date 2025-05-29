function FavoriteArtistCard({ artist }) {
    return (
        <div className="card">
            <img src={artist.image} alt={artist.title} />
            <div className="card-content">
                <h3 className="card-title">{artist.title}</h3>
                <p className="card-subtext">  {artist.location}</p>
                <p className="card-subtext">  {new Date(artist.date).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default FavoriteArtistCard;
