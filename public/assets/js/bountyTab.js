


const BountyTab = (function(){
    var template = `   
    <div class="bounty-card">
      <h5 class="bounty-card-location">Coord</h5>

        <div class=""><span class="font-weight-light">For</span> <span class="poster"></span></div>
        
    </div>

    `;
    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
      
        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild; 
      }
    function addCard(cards,container){
    
        cards.forEach(card =>{
            let cardEle =createElementFromHTML(`   
            <div class="bounty-card">
              <h5 class="bounty-card-location">`+ card.location.coordinates +`</h5>
        <div class="row">
                <div class="col-5"><span class="font-weight-light">For</span> <span class="poster">`+card.bounty+`</span></div>
                <div class="col-6 col-offset-1"><span class="font-weight-light">Date:</span> <span class="poster">`+card.date.slice(0,10)+`</span></div>
                </div>
            </div>
   
            `);
       
            container.appendChild(cardEle);
        })
    }
    var usernameEle = document.querySelector(".username");
    var takenBountyContainer = document.querySelector(".taken-bounty")
    var bountyContainer = document.querySelector(".bounty-container")

    var Tab = document.querySelector("#tab-bounty");
    async function open(){
        Tab.style.display = "block";
        //get all taken bounties
        bountyContainer.innerHTML="";
        takenBountyContainer.innerHTML="";
        var userData = await (await fetch("/b/userData")).json();
        console.log(userData);
        if(userData){
            addCard(userData.takenBounty,takenBountyContainer);
            addCard(userData.postedBounty,bountyContainer);
            usernameEle.innerHTML = userData.name;
        }
  
        else{
            usernameEle.innerHTML ="Not Logged In";
        }

    }
    function close(){
        Tab.style.display = "none";
    }
    return {open,close}    
})()