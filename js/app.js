
function createURL() {
    var pageNumber = $("#pageNum").val();
    var text = "http://api.alquran.cloud/page/" + pageNumber + "/quran-uthmani ";

    pageInformation(text);
}

function pageInformation(text) {
    
    var ourData;
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', text);
    ourRequest.onload = function () {
        var ourData = JSON.parse(ourRequest.responseText);
        renderData(ourData)

    };
    ourRequest.send();

    
};
function renderData(ourData) {
    var surahInf = ":شماره ی صفحه" + ourData.data.number;
    $("#surahNum").text(surahInf);
    var ayatsNum = ourData.data.ayahs.length;
    var text = '';
    var surahNames = [];
    var line = [];
    var lineCheck = [];
    var juzs = [];
    var hezbs = [];
    var sajdes = [];
    $("#sajde").text("");
    for (i = 0; i < ayatsNum; i++) {
        var ayeh = ourData.data.ayahs[i].text;
        var numberInSurah=ourData.data.ayahs[i].numberInSurah;
        ayeh=ayeh+numberInSurah;
        var surahName = ourData.data.ayahs[i].surah.name;
        var juz = ourData.data.ayahs[i].juz;
        var hezb = ourData.data.ayahs[i].hizbQuarter;
        var sajde = ourData.data.ayahs[i].sajda;
        if (sajde != false) {
            if (ourData.data.ayahs[i].sajda.obligatory == true) {
                $("#sajde").text("****سجده واجب*****");
            }
            else {
                $("#sajde").text("****سجده مستحب*****");
            }

        }
        //     // if(ourData.data.ayahs[i].sajda.obligatory==true){
        //     //     $("#sajde").text("****سجده واجب****")
        //     // }
        //     // else{ $("#sajde").text("****سجده مستحب ****")

        //     // }


        if (juzs.indexOf(juz) == -1) {
            juzs[juzs.length] = juz;
        }
        
        if (surahName != lineCheck && i > 1) {
            ayeh = "<hr>" + ayeh;
        }
        lineCheck = surahName;
        if (surahNames.indexOf(surahName) == -1) {
            surahNames[surahNames.length] = surahName;
        }
        if (hezbs.indexOf(hezb) == -1) {
            hezbs[hezbs.length] = hezb;
        }

        text += ayeh + "<br>";
    }
    
    $("#page").html(text)
    $("#surahName").html(surahNames.join(" و "));
    $("#juz").html(juzs.join(" و "));
    $("#hezb").html(hezbs.join(" و "));
    //var hezbNumb="شماره حزب:";
    //hezbNumb=hezbNumb.bold();
    //$("#hezb").text(hezbNumb) ;

    //  if (sajdes.indexOf(true) !=-1){
    //      $("#sajde").text("****سجده دار****")
    //  }

};

$(document).ready(function () {
    createURL();
    $("#btnPre").click(function () {

        var num = parseInt($("#pageNum").val());
        if (num > 1) {
            num = num - 1;
            $("#pageNum").val(num);
            $("#btnNext").show();
            if (num == 1) {
                $("#btnPre").hide();
            }
            createURL();
        }

    });

    $("#btnNext").click(function () {

        var num = parseInt($("#pageNum").val());
        if (num <= 603) {
            num += 1;
            $("#pageNum").val(num);
            if (num > 1) {
                $("#btnPre").show();
            }
            if (num == 604) {
                $("#btnNext").hide()
            }
            createURL();

        }
    });
    $("#pageNum").change(function(){
        var inputNum=$("#pageNum").val();
        $("#pageNum").val(inputNum <= 604 ? inputNum : 604);
        createURL();
    });
});
