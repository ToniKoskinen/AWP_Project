// This component is "card-element" that shows the description of a user

const Profile = ({header,content}) => {


    return(
        <div>
        <div class="row">
            <div class="col s12 m12">
                <div class="card #f06292 pink lighten-2">
                    <div class="card-content white-text">
                        <span class="card-title">{header}</span>
                        <p class="desc left-align">Description</p>
                        <p>{content}</p>
                    </div>

                    </div>
                    </div>
                
        </div>

        </div>
            
        
    )
}

export default Profile