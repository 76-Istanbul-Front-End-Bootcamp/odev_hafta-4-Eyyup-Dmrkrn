/* Hocam, aşağıda yazdığım kod istenilenleri doğru bir şekilde çalıştırıyor. Fakat, Opsiyonel olarak belirttiğiniz tasarım kısımlarına pek vakit ayıramadım. Haftasonları müsait oluyorum. Teslim ettikten sonra tasarım kısmıyla da oynayacağımdan emin olabilirsiniz. */

const data = {
  USD: {EUR: 0.82, GBP: 0.74, TR:7.56},
  EUR: {USD: 1.23, GBP: 0.91, TR:9.23},
  GBP: {USD: 1.35, EUR: 1.10, TR:10.30},
  TR:  {USD: 0.13, EUR: 0.11, GBP:0.097}   // Yeni para birimi eklendi.
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName){
  for(let i =0; i< elements.length; i++){
    const currencyKeyDiv   = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);


const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function(){
    let fromTarget = document.querySelector("input[name='currency_from']:checked");
    let toTarget   = document.querySelector("input[name='currency_to']:checked");
    const amount   = document.querySelector("input[name='amount']").value;

    // controlFunc ile istenilen tüm durumları ele alan bir fonksiyon oluşturuldu.
    function controlFunc(fromTarget, toTarget, amount){
    // Seçim yapılmama durumlarını kontrol eden iç içe if bloğu oluşturuldu.
    if(fromTarget){
          fromTarget=fromTarget.value;
      if(toTarget){
          toTarget=toTarget.value;
      }else{
        alert("Hangi para birimine çevirmek istediğinizi de seçin.")
        calculateButton();  // Uyarı verildikten sonra tekrar seçim yapmasını sağlamak için fonksiyon tekrar çağırıldı.
      }
    }else{
      alert("Çevrilecek para birimini de seçin.")
      calculateButton();
    } 
    // Aynı para biriminin seçilme durumunu kontrol eden if bloğu
    if(fromTarget==toTarget)
    {
      alert("Aynı para birimlerini seçmeyin.")
      calculateButton();
    }
    // amount olarak sayının girilmeme durumunu kontrol eden if bloğu oluşturuldu.
    if (isNaN(amount)) {
        alert("Çevirmek istediğiniz para miktarını sayı olarak girin.");
        calculateButton();
    }
    
    const currentCurrencyObject = data[fromTarget];
    const resultForOne = currentCurrencyObject[toTarget];
    const result = amount * resultForOne;
    const currencyResult = document.querySelector("#currency-result");

    currencyResult.innerHTML = amount + " " + fromTarget + " = " + result + " " + toTarget;
  }
    controlFunc(fromTarget,toTarget, amount); // oluşturulan control fonksiyonu çağırıldı.
});