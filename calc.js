
$( document ).ready(function() {
   
   
    $("#investment").ionRangeSlider({
        grid: true,
        grid_num: 9,
        grid_snap: false,
        prettify_enabled:true,
        prettify_separator:",",
        skin: "round",
        min: 5000000,
        max: 50000000,
        from:5000000,
        step: 5000000,
         prefix: "₹ ",
       
        onChange: function () {
            console.log(document.getElementById("investment").value);
            getResult();
           
        }
    
       
       
    });
       
       
       $("#tenure").ionRangeSlider({
            grid: true,
            grid_num: 11,
            skin: "round",
            min: 1,
            max: 12,
            from: 1,
            step: 1,
            postfix: " Year",
    
            onChange: function () {
               console.log(document.getElementById("tenure").value);
               getResult();
            }
        });
        
        getResult();
});


   

    
    

    function getResult(){
 
        let rupee = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        });

        let intvestment=document.getElementById("investment").value;
        let tenure=document.getElementById("tenure").value;
        let int=getInterest(intvestment);
        let minYrlyProfit=getMinimumYearlyProfit(intvestment,int);
        let TotalAmount=getYearlyReturn(parseInt(intvestment),parseInt(int),parseInt(tenure)).principalAmount;
        let TotalInterest=getYearlyReturn(parseInt(intvestment),parseInt(int),parseInt(tenure)).interestAmount;
        let ReturnOfInvestment=getROI(intvestment,TotalInterest);

     //   var elem = document.getElementById('result');
       // elem.style.display = 'none';

       

           // elem.style.visibility = 'visible'; 
       
           /*

    var x = document.getElementById("result");
    if (x.style.display === "none") {
        x.style.display = "block";
     } else {
        x.style.display = "none";
    }

           */



           
        document.getElementById("tenure-out").innerHTML ="<b>"+ tenure +" Years</b>";
        document.getElementById("investment-out").innerHTML ="<b>"+ rupee.format(intvestment)+"</b>";
        document.getElementById("rate-of-interest").innerHTML =  "<b>" + int +" %</b>" ;
        document.getElementById("minumum-yearly-profit").innerHTML ="<b>"+rupee.format(minYrlyProfit) +"</b>";
        document.getElementById("total-asset").innerHTML ="<b>"+ rupee.format(Math.round(TotalAmount))+"</b>";  
        document.getElementById("net-interest").innerHTML ="<b>"+ rupee.format(Math.round(TotalInterest))+"</b>"
        document.getElementById("roi").innerHTML ="<b>"+ ReturnOfInvestment +"% </b>"
        //Chart Area
       
       getChart(Math.round(TotalAmount),Math.round(TotalInterest));
       
    }



    function getInterest(amount){
     
        var interest=0;
        switch(amount){
            case '5000000':
                interest=19.00;
                break;
        
            case '10000000':
                interest=19.50;
                break;
            case '15000000':
                interest=20.00;
                break;
            case '20000000':
                interest=20.50;
                break;
            case '25000000':
                interest=21.00;
                break;
            case '30000000':
                interest=21.50;
                break;
            case '35000000':
                interest=22.00;
                break;
            case '40000000':
                interest=22.50;
                break;
            case '45000000':
                interest=23.00;
                break;
            case '50000000':
                interest=24.00;
                break;

             default:
                interest=1.00;
     
    
            }

    return interest;
       

    }


    function getMinimumYearlyProfit(amount, interest){

        var result;

        result=(amount*interest)/100;

        return result;

    }


function  getYearlyReturn(amount,interest,years){

    
    var baseAmount=amount;
    var principalAmount=amount;
    var interestAmount=0;


    for (let i =1; i<=years; i++) {
       
        principalAmount=principalAmount+(principalAmount*interest)/100;
      

      }

      interestAmount=principalAmount-baseAmount;


return {principalAmount,interestAmount};

}


function getChart(val1,val2){
    
    let chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) {
        chartStatus.destroy();
        }   
    
const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Pricipal', 'Interest'],
      datasets: [{
        label: 'Amount: ₹',
        data: [val1, val2],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
            
          ],
        borderWidth: 1
      }]
    },
    options: {
        responsive: true,  
     
    }
  });

 

   
}


function getROI(amount,interest){
    var roi= (interest/amount)*100;

    return roi.toFixed(2);
}




