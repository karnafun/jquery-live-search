
fakeData = {}
function setLiveSearch(input){
   
    $('#submit').click(getSelected)
    getFakeData()
}

function toggleAll(toggleOn = true){
    $('.search-wrapper').each((index, element) => {
        checkbox = $(element).children('input').prop('checked',toggleOn)
    })
}
 
function getSelected() {
    list = [];
    $('.search-wrapper input:checkbox:checked').each((index, element) => {

        value = $(element).siblings('label').text()
        list.push(value)
    })
    results =[]
    $(list).each((index, _name) => {
        
        user = fakeData.find(({ name })=>name.trim()  ===_name.trim())
        if(user !== undefined) 
        {
            console.log(user)
            res = `<b>User: ${user['name']}</b> <br> email: ${user['email']}<br> city: ${user['address']['city']}<br>`
            results.push(res)
        }
        else{
            console.log(`didn't find ${_name} in ${fakeData}`)
        }
    })

    $('#results').html(results.join('<br>'))
}
function toggleSearchables(event) {
    let value = event.currentTarget.value
    $('.search-wrapper').each((index, element) => {
        checkbox = $(element).children('input')
        text = $(element).children('label').text()
        if (text.toLowerCase().includes(value.toLowerCase()))
            $(element).show()
        else {
            $(element).hide()
        }
    })
}


async function getFakeData(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
        fakeData=json;
        getCheckboxList(fakeData)
    })
}

function getCheckboxList(list){
console.log(list)
    var html =''
    $(list).each((index,user)=>{
        html+= `
            <div class="search-wrapper">
                <input type="checkbox" id='cb_${user.name}' checked>
                <label for="cb_${user.name}"> ${user.name}</label>
            </div>
        `
    } )
    $('#searchable').html(html) 
    $('#master').on('input', event => toggleSearchables(event))
}
function cleanInput(selector){
    $(selector).val(' ')
    $(selector).trigger('input')
}