//This components is tabs structure which shows all matches of a user

const Matches= ({matches}) => {
    
    const listMatches=matches.map((item)=>
        <li class="tab col s2"><a class="white-text" href={"/profile/"+item.id}>{item.name}</a></li>
    )
    return (

    <ul class="tabs col s12 #f48fb1 pink lighten-3">
        {listMatches}
    </ul>
 )
}

export default Matches
