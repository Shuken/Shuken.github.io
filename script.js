document.addEventListener('DOMContentLoaded', function () {
    start();
});

var page = 0;
var categoryIdsIndex = 0;
var categoryIds = [ 1088, 1093, 1092, 996, 834, 831, 821, 824, 827, 977, 990, 837,1019,1027,/*1001,1031,*/838,839,862,1087,818,819,863,836,825,1026,1021,976 ];
//var categoryIds = [ 1088, 1093, 1019, 1027 ];
var minElementsDifference = 4;
var emailEnabled = true;
var hitsPerPage = 1000;
var delayTime = 400;
var prefix = "https://es.webuy.com/product-detail/?id=";
var reverse = false;
var previousItems = [];

function start() {
    var previousItemsStr = localStorage.getItem("previous_items");
    if(previousItemsStr){
        previousItems = JSON.parse(previousItemsStr);
    }
    fetchData();
}

function fetchData() {
    const categoryIdString = categoryIds[categoryIdsIndex].toString();
    fetch("https://search.webuy.io/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.17.2)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.57.0)%3B%20Vue%20(3.3.4)%3B%20Vue%20InstantSearch%20(4.10.12)%3B%20JS%20Helper%20(3.14.2)&x-algolia-api-key=07aa231df2da5ac18bd9b1385546e963&x-algolia-application-id=LNNFEEWZVA", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        },
        referrer: "https://es.webuy.com/search?categoryIds=" + categoryIdString + "&sortBy=" + (reverse ? "price_desc": "price_asc"),
        referrerPolicy: "no-referrer-when-downgrade",
        body: "{\"requests\":[{\"indexName\":\"" + (reverse ? "prod_cex_es": "prod_cex_es_price_desc") + "\",\"params\":\"clickAnalytics=true&facets=%5B%22*%22%5D&filters=boxVisibilityOnWeb%3D1%20AND%20boxSaleAllowed%3D1%20AND%20categoryId%3A" + categoryIdString + "&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=" + hitsPerPage.toString() + "&maxValuesPerFacet=1000&page=" + page.toString() + "&query=&tagFilters=&userToken=cc2b66e3e9084783872da0ac141a10b9\"}]}"
    })
    // fetch("https://search.webuy.io/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.17.2)%3B%20Browser%20(lite)%3B%20instantsearch.js%20(4.57.0)%3B%20Vue%20(3.3.4)%3B%20Vue%20InstantSearch%20(4.10.12)%3B%20JS%20Helper%20(3.14.2)&x-algolia-api-key=07aa231df2da5ac18bd9b1385546e963&x-algolia-application-id=LNNFEEWZVA", {
    //   headers: {
    //     "content-type": "application/x-www-form-urlencoded",
    //     "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
    //     "sec-ch-ua-mobile": "?0",
    //     "sec-ch-ua-platform": "\"Windows\""
    //   },
    //   referrer: "https://es.webuy.com/search?categoryIds=" + categoryIdString + "&sortBy=box_name_asc&&stores=A+Coru%C3%B1a+Juan+Florez~Albacete+Concepci%C3%B3n~Alcala+Magna~Alcorcon+Tres+Aguas~Algeciras+Puerta+Europa~Alicante+Alfonso+X+El+Sabio~Barcelona+Fabra+i+Puig~Barcelona+Gran+de+Gracia~Barcelona+Passeig+Sant+Joan~Barcelona+Sant+Antoni~Barcelona+Sants~Bilbao+Areilza~Bilbao+Ballonti~Bilbao+de+la+Cruz~Castellon+Colon~Ciudad+Real+Ramon~C%C3%B3rdoba+Jesus+y+Maria~Elche+Glorieta~Getafe~Gij%C3%B3n+Ur%C3%ADa~Girona+Espai~Granada+San+Ant%C3%B3n~Hospitalet+Just+i+Oliveres~Huelva+Berdigon~Jerez+Larga~Legan%C3%A9s+Juan+Mu%C3%B1oz~Leon+Ordono~Lleida+Blondel~Logro%C3%B1o+Gran+Via~Madrid+Alcala~Madrid+Atocha~Madrid+Bravo+Murillo~Madrid+Hortaleza~Madrid+La+Laguna~Madrid+Usera~Madrid+Vaguada~Malaga+de+la+Mota~Mostoles+Plaza+Pradillo~Murcia+Primo+de+Rivera~Palma+Carrer+Arago~Palma+Joan+March~Salamanca+Mirat~San+Sebastian+-+Plaza+Cataluna~Santa+Coloma+de+Gramanet~Santander+San+Fernando~Sevilla+Asuncion~Sevilla+Imagen~Sevilla+Nervion~Sevilla+Santa+Justa~Talavera+Trinidad~Terrassa+Fontvella~Torrent+Avinguda~Valencia+Benimaclet~Valencia+Factory+Bonaire~Valencia+Fernando~Valencia+Ruzafa~Valladolid+Teresa+Gil~Vigo+Camelias~Vilanova+Maci%C3%A0~Vitoria+Independencia",
    //   referrerPolicy: "no-referrer-when-downgrade",
    //   body: "{\"requests\":[{\"indexName\":\"prod_cex_es_box_name_asc\",\"params\":\"clickAnalytics=true&&facetFilters=%5B%5B%22stores%3AA%20Coru%C3%B1a%20Juan%20Florez%22%2C%22stores%3AAlbacete%20Concepci%C3%B3n%22%2C%22stores%3AAlcala%20Magna%22%2C%22stores%3AAlcorcon%20Tres%20Aguas%22%2C%22stores%3AAlgeciras%20Puerta%20Europa%22%2C%22stores%3AAlicante%20Alfonso%20X%20El%20Sabio%22%2C%22stores%3ABarcelona%20Fabra%20i%20Puig%22%2C%22stores%3ABarcelona%20Gran%20de%20Gracia%22%2C%22stores%3ABarcelona%20Passeig%20Sant%20Joan%22%2C%22stores%3ABarcelona%20Sant%20Antoni%22%2C%22stores%3ABarcelona%20Sants%22%2C%22stores%3ABilbao%20Areilza%22%2C%22stores%3ABilbao%20Ballonti%22%2C%22stores%3ABilbao%20de%20la%20Cruz%22%2C%22stores%3ACastellon%20Colon%22%2C%22stores%3ACiudad%20Real%20Ramon%22%2C%22stores%3AC%C3%B3rdoba%20Jesus%20y%20Maria%22%2C%22stores%3AElche%20Glorieta%22%2C%22stores%3AGetafe%22%2C%22stores%3AGij%C3%B3n%20Ur%C3%ADa%22%2C%22stores%3AGirona%20Espai%22%2C%22stores%3AGranada%20San%20Ant%C3%B3n%22%2C%22stores%3AHospitalet%20Just%20i%20Oliveres%22%2C%22stores%3AHuelva%20Berdigon%22%2C%22stores%3AJerez%20Larga%22%2C%22stores%3ALegan%C3%A9s%20Juan%20Mu%C3%B1oz%22%2C%22stores%3ALeon%20Ordono%22%2C%22stores%3ALleida%20Blondel%22%2C%22stores%3ALogro%C3%B1o%20Gran%20Via%22%2C%22stores%3AMadrid%20Alcala%22%2C%22stores%3AMadrid%20Atocha%22%2C%22stores%3AMadrid%20Bravo%20Murillo%22%2C%22stores%3AMadrid%20Hortaleza%22%2C%22stores%3AMadrid%20La%20Laguna%22%2C%22stores%3AMadrid%20Usera%22%2C%22stores%3AMadrid%20Vaguada%22%2C%22stores%3AMalaga%20de%20la%20Mota%22%2C%22stores%3AMostoles%20Plaza%20Pradillo%22%2C%22stores%3AMurcia%20Primo%20de%20Rivera%22%2C%22stores%3APalma%20Carrer%20Arago%22%2C%22stores%3APalma%20Joan%20March%22%2C%22stores%3ASalamanca%20Mirat%22%2C%22stores%3ASan%20Sebastian%20-%20Plaza%20Cataluna%22%2C%22stores%3ASanta%20Coloma%20de%20Gramanet%22%2C%22stores%3ASantander%20San%20Fernando%22%2C%22stores%3ASevilla%20Asuncion%22%2C%22stores%3ASevilla%20Imagen%22%2C%22stores%3ASevilla%20Nervion%22%2C%22stores%3ASevilla%20Santa%20Justa%22%2C%22stores%3ATalavera%20Trinidad%22%2C%22stores%3ATerrassa%20Fontvella%22%2C%22stores%3ATorrent%20Avinguda%22%2C%22stores%3AValencia%20Benimaclet%22%2C%22stores%3AValencia%20Factory%20Bonaire%22%2C%22stores%3AValencia%20Fernando%22%2C%22stores%3AValencia%20Ruzafa%22%2C%22stores%3AValladolid%20Teresa%20Gil%22%2C%22stores%3AVigo%20Camelias%22%2C%22stores%3AVilanova%20Maci%C3%A0%22%2C%22stores%3AVitoria%20Independencia%22%2C%22stores%3AZaragoza%20Carmen%22%5D%5D&facets=%5B%22*%22%5D&&filters=boxVisibilityOnWeb%3D1%20AND%20boxSaleAllowed%3D1%20AND%20categoryId%3A" + categoryIdString + "&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=" + hitsPerPage.toString() + "&maxValuesPerFacet=1000&page=" + page.toString() + "&query=&tagFilters=&userToken=cc2b66e3e9084783872da0ac141a10b9\"}]}",
    //   //body: "{\"requests\":[{\"indexName\":\"prod_cex_es_box_name_asc\",\"params\":\"clickAnalytics=true&facets=%5B%22*%22%5D&filters=boxVisibilityOnWeb%3D1%20AND%20boxSaleAllowed%3D1%20AND%20categoryId%3A" + categoryIdString + "&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=" + hitsPerPage.toString() + "&maxValuesPerFacet=1000&page=" + page.toString() + "&query=&tagFilters=&userToken=cc2b66e3e9084783872da0ac141a10b9\"}]}",   
    //   method: "POST",
    //   mode: "cors",
    //   credentials: "omit"
    // })
    .then(response => response.json())
    .then(data => {
        updateItemsList(data.results[0].hits);
        return data;
    })
    .then(data => {
        var isRoundCompleted = false;
       page = page + 1;
        if(page == data.results[0].nbPages){
            page = 0;
            if(reverse)
            {
                reverse = false;
                categoryIdsIndex = categoryIdsIndex + 1;
                if(categoryIdsIndex == categoryIds.length){
                    isRoundCompleted = true;
                    categoryIdsIndex = 0;
                }
            }
            else
            {
                if(data.results[0].nbHits > 1000){
                    reverse = true;
                }
                else{
                    categoryIdsIndex = categoryIdsIndex + 1;
                    if(categoryIdsIndex == categoryIds.length){
                        isRoundCompleted = true;
                        categoryIdsIndex = 0;
                    }
                }
            }
        }
        var newDelayTime = delayTime;
        if(isRoundCompleted){
            var now = new Date(Date.now());
            var addedMinutes = 10 - (now.getMinutes() % 10);
            var nextDateTime = now.getTime() + (addedMinutes * 60000);
            var newDate = new Date(nextDateTime);
            newDate.setSeconds(25);
            newDelayTime = newDate.getTime() - now.getTime();
        }
        setTimeout(() => {
            fetchData();
        }, newDelayTime); 
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        setTimeout(() => {  fetchData(); }, delayTime);
    });
}

function updateItemsList(newItems) {
    /*var previousItemsStr = localStorage.getItem("previous_items");
    var previousItems;
    if(previousItemsStr){
        previousItems = JSON.parse(previousItemsStr);
    }
    else{
        previousItems = [];
    }*/
    console.log("Start update category " + categoryIds[categoryIdsIndex].toString() + " with " + newItems.length.toString() + " items");
    // Merge new items with previous items
    //const updatedItems = mergeItems(previousItems, newItems);
    var itemsToShow = [];
    newItems.forEach(newItem => {
    const existingItemIndex = previousItems.findIndex(item => item.boxId === newItem.boxId);
    if (existingItemIndex !== -1) {
        // Add the new item if has more quantity
        var previousItem = previousItems[existingItemIndex];
        var hasNewToShow = previousItem.collectionQuantity < newItem.collectionQuantity && previousItem.collectionQuantity <= minElementsDifference;
        if(hasNewToShow) {
            newItem["previousQuantity"] = previousItem.collectionQuantity;
            itemsToShow.push(newItem);
            trySendEmail(newItem);
        }
        previousItem.collectionQuantity = newItem.collectionQuantity;
    } else {
        // Add the new item if it doesn't exist
        newItem["previousQuantity"] = 0;
        itemsToShow.push(newItem);
        trySendEmail(newItem);
        var itemData = {};
        itemData["boxId"] = newItem.boxId;
        itemData["collectionQuantity"] = newItem.collectionQuantity;
        previousItems.push(itemData);
    }
    });


    // Display the filtered items
    displayItems(itemsToShow);

    // Update the JSON file with the latest information
    updateItemsToFile(previousItems);
    console.log("Finish update category " + categoryIds[categoryIdsIndex].toString());
}

function displayItems(items) {
    const itemsList = document.getElementById('items-list');
    items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'item';
        
        // Create image element
        const img = document.createElement('img');
        img.src = item.imageUrls.small; // Adjust this according to your response data structure
        img.alt = item.name; // Adjust this according to your response data structure
        li.appendChild(img);
        
        // Create div for text content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'item-content';
        
        // Create paragraph for item name
        const namePara = document.createElement('p');
        namePara.textContent = item.boxName; // Adjust this according to your response data structure
        contentDiv.appendChild(namePara);
        
        // Create paragraph for number of elements
        const countPara = document.createElement('p');
        countPara.textContent = `From ${item.previousQuantity} to ${item.collectionQuantity}`; // Adjust this according to your response data structure
        contentDiv.appendChild(countPara);

        // Create button
        const button = document.createElement('button');
        button.textContent = 'Open Webpage';
        button.addEventListener('click', function() {
            let itemUrl = prefix.concat(item.boxId)
            openWebpage(itemUrl); // Adjust this according to your response data structure
        });
        contentDiv.appendChild(button);
        
        li.appendChild(contentDiv);
        
        itemsList.prepend(li);
    });
}

function updateItemsToFile(items) {
    const data = JSON.stringify(items);
    localStorage.setItem("previous_items", data);
}

function openWebpage(url) {
    window.open(url, '_blank');
}

function trySendEmail(itemToShow){
    if (itemToShow.categoryId == 1088 || itemToShow.categoryId == 990 || itemToShow.categoryId == 1019 || itemToShow.categoryId == 1027 || itemToShow.categoryId == 837 || itemToShow.categoryId == 1021 || itemToShow.categoryId == 1092 || itemToShow.categoryId == 1093 || (itemToShow.categoryId == 834 && itemToShow.sellPrice >= 30) || (itemToShow.categoryId == 977 && itemToShow.sellPrice >= 30) || (itemToShow.categoryId == 824 && itemToShow.sellPrice >= 30) || (itemToShow.categoryId == 821 && itemToShow.sellPrice >= 30) || (itemToShow.categoryId == 831 && itemToShow.sellPrice >= 30) || (itemToShow.categoryId == 831 && itemToShow.sellPrice >= 30)
    || (itemToShow.categoryId == 996 && itemToShow.sellPrice >= 30) || (itemToShow.categoryId == 862 && itemToShow.sellPrice >= 20) || (itemToShow.categoryId == 818 && itemToShow.sellPrice >= 25)){
        emailSend(itemToShow);
    }
}

function emailSend(itemToSend){
    var messageBody = "<p>From " + itemToSend.previousQuantity + " to " + itemToSend.collectionQuantity+"</p>";
    messageBody = messageBody + "<p>" + prefix.concat(itemToSend.boxId) + "</p>";
    Email.send({
    Host : "smtp.elasticemail.com",
    Username : "shuken@gmail.com",
    Password : "EC6356BCA9CEF52F3EF251CAC32CC97BBAFF",
    To : 'shuken@gmail.com',
    From : "shuken@gmail.com",
    Subject : itemToSend.boxName + " [" + itemToSend.categoryName + "]",
    Body : messageBody
}).then(
  message => {
    if(message!='OK'){
        console.log("Error EMAIL");
        console.log(message);
    }
  }
);
}