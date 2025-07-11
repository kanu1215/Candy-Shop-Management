const api_url = "https://crudcrud.com/api/a4b0a06da159476695e6969949c910b4/candies";
const form = document.getElementById("form");
const list = document.getElementById("candyList");


form.addEventListener("submit",handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();

    const candyData = {
        name : e.target.name.value,
        desc : e.target.desc.value,
        price: e.target.price.value,
        quantity: parseInt(e.target.qty.value),


    };

    axios
    .post(api_url,candyData)
    .then((response) => {
        displayCandy(response.data);
        form.reset();
    })
    .catch((err) => console.log(err));
        

}


function displayCandy(candy)
{
    const li = document.createElement("li");
li.textContent = `${candy.name}  - #${candy.desc}  - ₹${candy.price} - Qty: ${candy.quantity}`;

    const buy1Btn = createButton("Buy 1",1,candy,li);
    const buy2Btn = createButton("Buy 2",2,candy,li);
    const buy3Btn = createButton("Buy 3",3,candy,li);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.onclick = () => deleteCandy(candy._id,li);

    li.appendChild(buy1Btn);
    li.appendChild(buy2Btn);
    li.appendChild(buy3Btn);
    li.appendChild(deleteBtn);

    list.appendChild(li);

}

function createButton(label,amount,candy)
{
    const btn = document.createElement("button");
    btn.textContent = label;
    
    btn.onclick = function() {
        const updateQty = candy.quantity - amount;

        if(updateQty<0)
        {
          alert(`Stock is empty. ${candy.quantity} left!`);
            return;
        }

        const updateCandy = {
            name : candy.name,
            desc : candy.desc,
            price : candy.price,
            quantity: updateQty,
        };

        axios
        .put(`${api_url}/${candy._id}`,updateCandy)
        .then(() => loadCandies())

        .catch((err) => console.log(err));
    };
    return btn;
}

function deleteCandy(id,liElement)
{
    axios
    .delete(`${api_url}/${id}`)
    .then(() => list.removeChild(liElement))
    .catch((err) => console.log(err));
}


function loadCandies() {
    axios
    .get(api_url)
    .then((res) => {
        list.innerHTML = "";
        res.data.forEach(displayCandy);
    })
    .catch((err) => console.log(err));
    
}

window.addEventListener("DOMContentLoaded",loadCandies);