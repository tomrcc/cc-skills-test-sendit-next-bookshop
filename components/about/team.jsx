export default function AboutTeam(block) {
    return (
        <div className="team">
            <div className="container">
                <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                    <div className="section-header">
                    <h2 data-editable="text" data-prop="title">{block.title}</h2>
                    </div>
                </div>
                </div>
                <div className="row" data-editable="array" data-prop="team_members">
                    {block.team_members.map((member, i) => (
                        <div className="col-lg-3 col-md-6"  key={i} data-editable="array-item">
                            <div className="team-member">
                            <div className="team-member-thumb rounded-box">
                                <img data-editable="image" data-prop-src="image" data-prop-alt="image_alt" src={member.image} alt={member.image_alt} loading="lazy" />
                            </div>
                            <div className="team-member-details">
                                <h3 data-editable="text" data-prop="name">{member.name}</h3>
                                <p data-editable="text" data-prop="designation">{member.designation}</p>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
