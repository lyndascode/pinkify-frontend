function FavoriteConcertCard({ concert }) {
    return (
        <div className="card">
            <img src={concert.image} alt={concert.title} />
            <div className="card-content">
                <h3 className="card-title">{concert.title}</h3>
                <p className="card-subtext">  {concert.location}</p>
                <p className="card-subtext">  {new Date(concert.date).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default FavoriteConcertCard;
