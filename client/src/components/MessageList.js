//This component lists all messages in a chat


const MessageList = ({receiver,items}) => {
    const listItems=items.map((item)=>{
        if (item.user===receiver){
        return(<li class="col 12 container darker">
            <p class="msg black-text">{item.content}</p>
            <span class="time">{item.lastedited}</span>
        </li>)
        } else {
        return(<li class="col 12 container right">
            <p class="msg black-text">{item.content}</p>
            <span class="time">{item.lastedited}</span>
        </li>)            
        }
    })
    return (
        <ul class="scrolling">
            {listItems}
        </ul>
    )
}

export default MessageList

