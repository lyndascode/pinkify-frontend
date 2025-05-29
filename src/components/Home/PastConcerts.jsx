import './PastConcerts.css';

const pastConcerts = [
    {
        artist: "BLACKPINK",
        location: "Hyde Park, Londres",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.nme.com%2Fwp-content%2Fuploads%2F2023%2F07%2Fblackpink-hyde-park-image4.jpeg&f=1&nofb=1&ipt=7d13bf1d8095248b342ec0a9bd6021491a827d7523b88278f79deeff53d09e1e",
        video: "https://www.youtube.com/watch?v=1BMOY4wlJhI&pp=ygUdQkxBQ0tQSU5LICJIeWRlIFBhcmssIExvbmRyZXM%3D"
    },
    {
        artist: "ITZY",
        location: "Los Angeles",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.kpopconcerts.com%2Fwp-content%2Fuploads%2F2022%2F11%2F13144641%2F221026_ITZY_LA_JYPE_feat_004.jpg&f=1&nofb=1&ipt=a823efe9315b88195a2237fc754707d4fdd53290421225cd4fd398b1da58e217",
        video: "https://www.youtube.com/watch?v=4IM7EolpkJc&list=PLl3Cj2U_5YjTvdOzmbpkDsSX71tPtpnyo&index=3&pp=iAQB8AUB"
    },
    {
        artist: "Stray Kids",
        location: "Melbourne",
        image: "https://mapetitecoree.com/cdn/shop/articles/fa841e1af8fbed6e4e698f6fb086ade5.jpg?v=1745197214",
        video: "https://www.youtube.com/watch?v=U4R9EeOWmhM&pp=ygUTdHJheSBraWRzIG1lbGJvdXJuZQ%3D%3D"
    },
    {
        artist: "BTS",
        location: "Stade de France, Paris",
        image: "https://www.hollywoodreporter.com/wp-content/uploads/2019/05/bts_metlife_-publicity-h_2019.jpg?w=1296&h=730&crop=1",
        video: "https://www.youtube.com/watch?v=rsk2Mi17yH8&pp=ygUTYnRzIHN0YWRlIGRlIGZyYW5jZQ%3D%3D"
    }
];

function PastConcerts() {
    return (
        <section className="past-concerts">
            <h2>Passed K-pop Concerts</h2>
            <p>Revive best K-Pop moments in the world online.</p>
            <div className="concerts-grid">
                {pastConcerts.map((concert, index) => (
                    <div key={index} className="concert-card">
                        <img src={concert.image} alt={`${concert.artist} à ${concert.location}`} />
                        <h3>{concert.artist}</h3>
                        <p>{concert.location}</p>
                        <a href={concert.video}   >See the video</a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PastConcerts;
