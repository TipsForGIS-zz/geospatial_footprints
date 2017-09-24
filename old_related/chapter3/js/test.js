// the map object
var myMap;

// the layer used to display the features found in the message
var theGJLayer = L.mapbox.featureLayer();

// the turf featurecolllection object to collect the features found
var theFC;

var tempFCArr = [];

function initMap() {

	var southWest = L.latLng(38.8174361111111, -77.3388527777778),
    northEast = L.latLng(38.84195, -77.2727972222222),
    bounds = L.latLngBounds(southWest, northEast);


	// Define the map object with removing the zoom control.
	L.mapbox.accessToken = 'pk.eyJ1IjoiYWFidXJpemEiLCJhIjoiYlN2dzI0RSJ9.IjJvieDo3m-cPBq4zk-jKw';
	myMap = L.mapbox.map('mbMap', 'aaburiza.k9dg608e', { zoomControl: false, minZoom: 14 });
	// Defining the latlng object based on the center of GMU campus
	var latlng = L.latLng(38.8294527777778,-77.3061638888889);
	// Setting the map with the latlng center and zoom level
	myMap.setView(latlng,16);
	// Adding a zoom control to the bottom right of the map.
	new L.Control.Zoom({ position: 'bottomright' }).addTo(myMap);

  	//testF();
  	//testIntersection();
  	loadGJ();
  	length();

}

function testF() {

	var line = {
		  "type": "Feature",
		  "properties": {},
		  "geometry": {
		    "type": "MultiLineString",
		    "coordinates": [[
		      [-77.3071368546685,38.8354366786889],
		      [-77.3071440114897,38.8346456576278],
		      [-77.3072186213233,38.8341126922575]
		    ]]
		  }
		};

	var lineUniv = {
		  "type": "Feature",
		  "properties": {"stroke": "#ff0000"},
		  "geometry": {
		    "type": "MultiLineString",
		    "coordinates":[[[-77.3045656578661,38.8346132594239],[-77.3044592887166,38.8343464680423]],[[-77.3071368546685,38.8354366786889],[-77.3066168804302,38.8355399339482]],[[-77.3174710780396,38.8354922238207],[-77.3173274978145,38.8354701828247],[-77.3167344549292,38.8354518484827],[-77.3166012667336,38.8354381459196],[-77.3164472429243,38.8354105086087],[-77.3161536444109,38.8353306596601]],[[-77.3085076356878,38.8352876130657],[-77.3077170692998,38.8353773320305],[-77.3071368546685,38.8354366786889]],[[-77.3147587431293,38.834970585881],[-77.3142833616508,38.83484358736]],[[-77.3119306907433,38.8350792924332],[-77.3122746766734,38.8350841469776],[-77.3123976504451,38.835078526378],[-77.3125066965522,38.8350658997391],[-77.3126405416786,38.8350397938939],[-77.3127569260603,38.835008019276],[-77.3131562210217,38.8348527898376],[-77.3133396404772,38.8348011002639],[-77.3134629086464,38.8347776297983],[-77.3136001043799,38.8347611677317],[-77.3137265650908,38.8347569539925],[-77.313863420547,38.8347610831625],[-77.3140035822144,38.8347776025714],[-77.3141365646747,38.8348036602659],[-77.3142833616508,38.83484358736]],[[-77.304911481826,38.8352449461993],[-77.3047820498042,38.8350022176374],[-77.3046926925325,38.8348577659092],[-77.3045656578661,38.8346132594239]],[[-77.3117939903086,38.8350655515905],[-77.3111135656463,38.8350243361401],[-77.3109520468888,38.8350254459036],[-77.3103400322456,38.8350848891507]],[[-77.3119306907433,38.8350792924332],[-77.3117939903086,38.8350655515905]],[[-77.3066168804302,38.8355399339482],[-77.3062405578573,38.8355847029118],[-77.3056980889361,38.8355987583479],[-77.3054566439997,38.8355702025573],[-77.3051992781633,38.8354958120274],[-77.3050429776,38.8353637280932],[-77.304911481826,38.8352449461993]],[[-77.3161536444109,38.8353306596601],[-77.3147587431293,38.834970585881]],[[-77.3103400322456,38.8350848891507],[-77.3095170916148,38.8351770325489],[-77.3089578423128,38.8352386356193],[-77.3085076356878,38.8352876130657]],[[-77.3065202621195,38.8363562097768],[-77.3065075214432,38.8362778185487],[-77.3065009343223,38.8362516645703],[-77.3064943700147,38.83622413851],[-77.3064912932476,38.8361980202267],[-77.3064882393027,38.8361705291754],[-77.3064821314199,38.836115547072],[-77.306479054662,38.8360894287877],[-77.3064764571292,38.8360344823794],[-77.3064769135316,38.8360070270233],[-77.3064813366675,38.8359521520069],[-77.306507057702,38.8358796548634]],[[-77.3071705967546,38.8405339917129],[-77.3071749740229,38.8404818622627],[-77.3071798530511,38.840399532635],[-77.3071806057397,38.8403542299672],[-77.3071813355966,38.8403103014382],[-77.3071820882491,38.8402650008285],[-77.3071828409121,38.840219699532],[-77.3071800602274,38.8401757353261],[-77.3071773023541,38.8401303983531],[-77.3071745216762,38.8400864341462],[-77.3071682532775,38.8400410614963],[-77.3071364324199,38.8398430263348],[-77.3071010784157,38.8396463282443],[-77.3070657474265,38.8394482566808],[-77.3070303937989,38.8392515592368],[-77.3069984596046,38.8390603885215],[-77.3069381022258,38.8386780806624],[-77.3068282599511,38.8381044228217]],[[-77.306741464522,38.8376229907301],[-77.306632240604,38.8370122692021],[-77.3065202621195,38.8363562097768]],[[-77.3068282599511,38.8381044228217],[-77.3067766340137,38.8378306718486],[-77.306741464522,38.8376229907301]],[[-77.3067591355879,38.8418410227483],[-77.306873006794,38.8415387477367],[-77.306957469186,38.8413158075775]],[[-77.3066306495165,38.8421774746839],[-77.3066672864835,38.842085855618],[-77.3066892629951,38.8420311591263],[-77.306759021505,38.8418478865781],[-77.3067591355879,38.8418410227483]],[[-77.3061258899393,38.8436994378685],[-77.3061425231895,38.843659466776],[-77.3061681254309,38.8435979422827],[-77.3061902169142,38.8435363827643],[-77.3062123083939,38.8434748211817],[-77.3062344226286,38.8434118888878],[-77.3062565140092,38.8433503286677],[-77.3062751174876,38.8432873599748],[-77.3062937209334,38.8432243912779],[-77.3063679061461,38.8429862441064],[-77.3064534444768,38.8426987844048],[-77.3064719334907,38.8426426801854],[-77.3065049672123,38.842556515842],[-77.3065197401049,38.8425127308085],[-77.3065310023401,38.8424689093915],[-77.3065494684248,38.8424141772361],[-77.3065679573017,38.8423580723112],[-77.3065864224521,38.8423033401396],[-77.306604888452,38.8422486079732],[-77.3066306495165,38.8421774746839]],[[-77.3052966119544,38.8459616144852],[-77.3054734468957,38.845463643248],[-77.3055471337788,38.845255696849],[-77.305594783905,38.8451353586557]],[[-77.3058998334702,38.8443174099219],[-77.3059401640953,38.8442148453922],[-77.3061169209043,38.8437209912629],[-77.3061258899393,38.8436994378685]],[[-77.305594783905,38.8451353586557],[-77.305708779438,38.8448262205027],[-77.3058998334702,38.8443174099219]]]}};

	var lineSager = {
		  "type": "Feature",
		  "properties": {"stroke": "#00ff00"},
		  "geometry": {
		    "type": "MultiLineString",
		    "coordinates": [[[-77.2967322228831,38.8407267629619],[-77.2968340282646,38.8407278065594],[-77.2968480705075,38.8407279504981],[-77.2968656003058,38.8407295031837],[-77.2968831088551,38.8407324286489],[-77.2969146348905,38.8407368707888],[-77.2969461149222,38.840744058449],[-77.2969600642765,38.840749693423],[-77.29698798775,38.8407595906196],[-77.2970054485624,38.840765260891],[-77.2970297924783,38.840779240391],[-77.297057623966,38.8407946286285],[-77.2970819218995,38.8408113536464],[-77.2970922925868,38.8408210709292],[-77.2971026862777,38.8408294154467],[-77.2975610227408,38.8411361709696],[-77.2980817733083,38.8414902471242],[-77.2984775925077,38.8417565424598]],[[-77.2984775925077,38.8417565424598],[-77.2989983971476,38.8421078689578],[-77.2993316982807,38.8423337039531]],[[-77.2993316982807,38.8423337039531],[-77.2994497515394,38.8424131724071]],[[-77.2994497515394,38.8424131724071],[-77.299786521131,38.8426417882249],[-77.3001024106629,38.8428592056105]],[[-77.3001024106629,38.8428592056105],[-77.3004877366795,38.8431240136632],[-77.3008626930912,38.8433791034825]],[[-77.3033173671992,38.8446261222667],[-77.3035237238283,38.8446749077412],[-77.3036566064329,38.8447078410694],[-77.3037895129114,38.8447394014914],[-77.3043001404646,38.8448613094621]],[[-77.305594783905,38.8451353586557],[-77.3054897811523,38.8451150682268],[-77.3053707564338,38.8450932620039],[-77.304359617726,38.8448742722742],[-77.3043001404646,38.8448613094621]],[[-77.305594783905,38.8451353586557],[-77.3057312704433,38.8451628342961],[-77.305850248839,38.8451873856734],[-77.3059692264383,38.8452119369211],[-77.3060881839216,38.8452378608396],[-77.3062071388692,38.8452637839242],[-77.3068471260315,38.8454199481495]],[[-77.3068471260315,38.8454199481495],[-77.3069275549181,38.8454399875933]],[[-77.3008626930912,38.8433791034825],[-77.3011439652645,38.8435673313467],[-77.3016511427877,38.843895164134]],[[-77.3016511427877,38.843895164134],[-77.3017970578242,38.8439886452497],[-77.3018629825854,38.8440360001089],[-77.3019324181608,38.8440833907631],[-77.3020018529503,38.8441307813667],[-77.3020713133713,38.8441767991912],[-77.3021407712484,38.8442228169473],[-77.3022102529966,38.8442674619065],[-77.3022797348426,38.8443121061377],[-77.3023527275045,38.8443567868335],[-77.3023770965577,38.8443693938209],[-77.3024049763845,38.8443820352487],[-77.3024293454784,38.8443946408525],[-77.3024572253242,38.8444072822678],[-77.3024851509781,38.844417178148],[-77.3025130528749,38.8444284460905],[-77.3025409785447,38.8444383419573],[-77.3025689042222,38.8444482378175],[-77.3026003653057,38.8444567967371],[-77.302628313895,38.8444653198189],[-77.3026562616132,38.844473842885],[-77.3026877438583,38.8444810289989],[-77.3027157153621,38.8444881792955],[-77.3027472205135,38.8444939926292],[-77.3027752149219,38.8444997701473],[-77.3031284950729,38.8445816336975],[-77.3033173671992,38.8446261222667]]]}};

		var lineGMU = {
		  "type": "Feature",
		  "properties": {"stroke": "#00ff00"},
		  "geometry": {
		    "type": "MultiLineString",
		    "coordinates": [[[-77.3084479285897,38.834231169998],[-77.3085252658986,38.8340136481219],[-77.3085690061015,38.8339166091474],[-77.3086234363214,38.8338100676693],[-77.3087233398466,38.8337135987372],[-77.3088945405953,38.8335519493096],[-77.3089692115406,38.8334950410938],[-77.3090679984453,38.8334658375488],[-77.3094100596662,38.8333745710301],[-77.3101011771473,38.8331934789422],[-77.3101576133175,38.8331775751064],[-77.310221342829,38.8331452691793],[-77.3103486652091,38.8330888938376]],[[-77.3084479285897,38.834231169998],[-77.3084151534051,38.8345136752505],[-77.3084186198578,38.8347278984357],[-77.3084620910255,38.8350702167358],[-77.3085076356878,38.8352876130657]],[[-77.3089617540254,38.8364720098164],[-77.3088900458947,38.8362922588019],[-77.3088126274722,38.8361365335603],[-77.3087233383632,38.8360075051985],[-77.3086142674772,38.8358110237004],[-77.3085076356878,38.8352876130657]],[[-77.3090428887639,38.8367551437212],[-77.3090139672779,38.8366302107607],[-77.3089617540254,38.8364720098164]],[[-77.308953887105,38.8373818473723],[-77.3090044295267,38.8372051767941],[-77.3090385089707,38.8369880120988],[-77.3090428887639,38.8367551437212]],[[-77.3078277903728,38.8400021862089],[-77.3077301571485,38.8402209243564],[-77.307682654315,38.8403024681744],[-77.3076354791483,38.8403643292529],[-77.3075415082227,38.84046508838],[-77.3074648070633,38.8405364924477],[-77.3073708356842,38.8406372507476],[-77.307268584535,38.8407313632792],[-77.3071618654694,38.8408418348993],[-77.3070884952857,38.8409084519769],[-77.3070558753804,38.8409614010197],[-77.3069527826167,38.8412249546569],[-77.306957469186,38.8413158075775]],[[-77.306957469186,38.8413158075775],[-77.3070405270114,38.8412311922421],[-77.3071253042587,38.8409987059529],[-77.3071634882354,38.8409506306001],[-77.3072529381781,38.8408695125685],[-77.3073596571448,38.8407590408663],[-77.307461908214,38.8406649282561],[-77.3075558795015,38.8405641698839],[-77.3076325805999,38.8404927657572],[-77.3077265514339,38.8403920065579],[-77.3077737265403,38.8403301454431],[-77.3078212292887,38.8402486015888],[-77.3079194109611,38.8400271098996]],[[-77.3090535315356,38.8383285642496],[-77.3090580533004,38.8382986945502],[-77.309058599816,38.8382657481285],[-77.3090626340045,38.8382342100935],[-77.3090596473028,38.8382026008196],[-77.3090601938055,38.8381696550836],[-77.3090572071075,38.8381380458092],[-77.3090542204349,38.8381064351618],[-77.3090512565024,38.8380734538055],[-77.3090482698123,38.8380418445302],[-77.309041772691,38.8380101996348],[-77.3090387860078,38.8379785903587],[-77.3090323116682,38.8379455726946],[-77.3090223041334,38.8379138921772],[-77.3090158052799,38.8378822472616],[-77.3090091487813,38.837860211737],[-77.3090024922868,38.837838176212],[-77.3089958357964,38.8378161406865],[-77.308992712506,38.8377927680141],[-77.3089860787955,38.8377693597201],[-77.308953887105,38.8373818473723]],[[-77.3088483472596,38.8373945063292],[-77.3088618422756,38.8374275952584],[-77.3088651477068,38.8374399857939],[-77.3088684531392,38.8374523763292],[-77.3088750640073,38.8374771573995],[-77.3088783694431,38.8374895479344],[-77.3088781416963,38.8375032756123],[-77.3088779367242,38.8375156305224],[-77.3088773901314,38.8375485769491],[-77.3088770712854,38.8375677956979],[-77.3088767296645,38.8375883872144],[-77.3088799212323,38.8376076415877],[-77.3088795796234,38.8376282324176],[-77.3088827711938,38.8376474867907],[-77.3088856211242,38.8376873340523],[-77.3088884938552,38.8377258071731],[-77.308894854248,38.837765687999],[-77.308897726987,38.8378041611188],[-77.3089104705552,38.8378825513725],[-77.3089168537367,38.8379210601145],[-77.3089232141512,38.8379609416234],[-77.3089430014193,38.8380380303496],[-77.308949407417,38.8380751656344],[-77.3089524615076,38.8381026566002],[-77.3089520060157,38.838130113325],[-77.3089550609873,38.8381576042993],[-77.3089546055302,38.8381850589647],[-77.3089541500613,38.8382125143162],[-77.3089536945921,38.8382399696675],[-77.308953261896,38.8382660522511],[-77.3089492959784,38.8382934719796],[-77.3089488405069,38.8383209273304],[-77.3089477033307,38.83832772861]],[[-77.3089477033307,38.83832772861],[-77.3089449437831,38.8383442287646],[-77.308937399085,38.8383757311719],[-77.3089334331553,38.8384031508991],[-77.3089259795422,38.8384291622352],[-77.3089185031494,38.8384565463382],[-77.3089109812023,38.8384866759755],[-77.3088999260156,38.8385181427555],[-77.3088888936054,38.8385482360804],[-77.3088778611518,38.8385783314632],[-77.3088668287118,38.8386084254719],[-77.3088522858093,38.8386384831677],[-77.3088377428832,38.8386685415477],[-77.308823199945,38.8386985999258],[-77.308808679771,38.8387272855344],[-77.3087906491152,38.8387559355138],[-77.3087761744706,38.8387818755833],[-77.3087582348976,38.838805034488],[-77.3087402725353,38.8388295661571],[-77.3087223101608,38.8388540978233],[-77.3087008600762,38.8388772210894],[-77.3086829204551,38.838900379982],[-77.308661470344,38.8389235032406],[-77.3086435534782,38.8389452893596],[-77.308615036831,38.838971086194],[-77.3085757608967,38.8390105044792],[-77.3085508229931,38.8390322206887],[-77.308408420563,38.8391502252735],[-77.3083692355571,38.8391841524193],[-77.3083335618843,38.8392181152017],[-77.3082978645139,38.8392534507312],[-77.3082621671083,38.8392887862496],[-77.3082264696676,38.8393241217568],[-77.3081942826912,38.8393594928981],[-77.3081620728942,38.8393962367973],[-77.308129726338,38.839441216603],[-77.3081008902127,38.8394862341064],[-77.3080720312946,38.8395326223101],[-77.3080431951192,38.8395776384257],[-77.3080143361158,38.8396240273006],[-77.3079889875896,38.8396704518192],[-77.3079636390307,38.8397168763318],[-77.307938290439,38.8397633008385],[-77.3078580737541,38.8399423495998],[-77.3078277903728,38.8400021862089]],[[-77.3079194109611,38.8400271098996],[-77.3079562764841,38.8399488389631],[-77.3079820582114,38.8398763305121],[-77.3080001578365,38.8398435630504],[-77.3080147469351,38.8398107592488],[-77.3080328465401,38.8397779910952],[-77.308065535184,38.8397124191299],[-77.3080836347411,38.8396796509677],[-77.3081052220051,38.8396482912173],[-77.3081232987381,38.8396168958154],[-77.3081376370499,38.8395991924333],[-77.3081484648442,38.8395814534029],[-77.3081664731747,38.8395541762948],[-77.3081880603533,38.8395228172146],[-77.3082202929818,38.8394847005424],[-77.3082525028115,38.8394479552553],[-77.308284712574,38.8394112120181],[-77.3083169223151,38.8393744680854],[-77.3083491092377,38.8393390969106],[-77.3083848057479,38.8393037613574],[-77.3084205031006,38.8392684258018],[-77.3084562021733,38.839233090253],[-77.3085381045136,38.8391638987495],[-77.3085879120171,38.8391245873791],[-77.3086128271384,38.8391042453021],[-77.3086377422457,38.8390839032198],[-77.3086591468423,38.8390635261873],[-77.3087090453461,38.8390187223227],[-77.3087269166543,38.8389996817286],[-77.3087662835974,38.8389547730099],[-77.308787733684,38.8389316497323],[-77.3088056732792,38.8389084908239],[-77.3088236128627,38.8388853319125],[-77.3088451540131,38.8388567175547],[-77.3088812608676,38.8387966720429],[-77.3089138571924,38.8387365908955],[-77.3089319333423,38.8387051953623],[-77.308961041014,38.838643705801],[-77.308975583872,38.8386136480919],[-77.3090012046819,38.8385507487661],[-77.309012261573,38.8385192826809],[-77.3090233167107,38.8384878158904],[-77.3090308613829,38.8384563134784],[-77.3090384060485,38.8384248110657],[-77.3090424402548,38.8383932730326],[-77.3090501670819,38.8383507884783],[-77.3090535315356,38.8383285642496]]]}};

var lineEast = {
		  "type": "Feature",
		  "properties": {"stroke": "#ff0000"},
		  "geometry": {
		    "type": "MultiLineString",
		    "coordinates":[[[-77.3039526882449,38.8456939236995],[-77.3039633807651,38.845684421666],[-77.3039812549797,38.8456653825112],[-77.3039991291962,38.8456463426672],[-77.30401353834,38.8456245215221],[-77.3040244366723,38.8456026646052],[-77.3040281533049,38.8455903454974],[-77.3040318470663,38.8455793991535],[-77.3041123320099,38.8453852535379],[-77.3043001404646,38.8448613094621]]]}};

		var start = {
		  "type": "Feature",
		  "properties": {},
		  "geometry": {
		    "type": "Point",
		    "coordinates": [-77.30720148125745,38.83423513002615]
		    //"coordinates": [-77.3071440114897,38.8346456576278]
		  }
		};
		var stop = {
		  "type": "Feature",
		  "properties": {},
		  "geometry": {
		    "type": "Point",
		    "coordinates": [-77.3072186213233,38.8341126922575]
		  }
		};

		var pt = {
				  "type": "Feature",
				  "properties": {},
				  "geometry": {
				    "type": "Point",
				    "coordinates": [-77.3077444444444, 38.834325]
				  }
		};

		var snapped = turf.pointOnLine(line, pt);


		var sliced = turf.lineSlice(start, stop, line);
        console.log(lineUniv);
		var intersection = turf.intersect(lineUniv, lineSager);
		var buffered = turf.buffer(intersection, 100, "feet");

		var intersection2 = turf.intersect(lineEast, lineSager);
		var buffered2 = turf.buffer(intersection2, 100, "feet");
		var linestring1 = turf.linestring([intersection.geometry.coordinates,intersection2.geometry.coordinates]);
		var buffered3 = turf.buffer(linestring1, 25, "feet");

		var exploded = turf.explode(lineUniv);

		//tempFCArr.push(sliced);
		//tempFCArr.push(pt);
		//tempFCArr.push(snapped);
		//tempFCArr.push(lineUniv);
		//tempFCArr.push(lineGMU);
		//tempFCArr.push(intersection);
		//tempFCArr.push(buffered);

		//tempFCArr.push(lineEast);
		//tempFCArr.push(lineSager);
		//tempFCArr.push(intersection2);
		//tempFCArr.push(buffered2);

		//tempFCArr.push(linestring1);
		//tempFCArr.push(buffered3);
		tempFCArr.push(exploded);

		console.log(exploded);


		theFC = turf.featurecollection(tempFCArr);
		theGJLayer.setGeoJSON(theFC).addTo(myMap);


}

function testIntersection() {
	
	var line1327 = {
		  "type": "Feature",
		  "properties": {},
		  "geometry": {"type":"LineString","coordinates":[[-77.30221456,38.82968464],[-77.30227267,38.82975634],[-77.30229605,38.82982971],[-77.30230586,38.83012619],[-77.30234758,38.83028057],[-77.30239479,38.83040038],[-77.30248123,38.83052828],[-77.30264173,38.83064154],[-77.30268838,38.83066357]]}
		};
		
		
	var polyPresidentsPark =
	      {
	  		"type": "Feature",
	  		"properties": {},
      "geometry": {"type": "Polygon","coordinates":[[[-77.30266929,38.83023881],[-77.30291605,38.8299045],[-77.30285168,38.82944481],[-77.30276585,38.82914393],[-77.30266929,38.82886811],[-77.30255127,38.82866752],[-77.30226159,38.82848364],[-77.30201483,38.82831648],[-77.30173588,38.82819947],[-77.3014462,38.8281326],[-77.30113506,38.8281326],[-77.30072737,38.82923586],[-77.30075955,38.82962033],[-77.30098486,38.82983763],[-77.30116725,38.83003822],[-77.30151057,38.83021374],[-77.3018539,38.83028896],[-77.30227232,38.83028896],[-77.30266929,38.83023881]]]}
      };
      
      
	  var intersect = turf.intersect(line1327,polyPresidentsPark);
	  var size = turf.buffer(polyPresidentsPark,-50,'feet');
	  console.log(size);
	 
	  tempFCArr.push(intersect);
	  tempFCArr.push(line1327);
	  tempFCArr.push(polyPresidentsPark);
	  //tempFCArr.push(size);
	  
	  theFC = turf.featurecollection(tempFCArr);
	  theGJLayer.setGeoJSON(theFC).addTo(myMap);
	  
}

function loadGJ() {
	
	obstLayer = L.mapbox.featureLayer();
	obstLayer.loadURL('input/patriotCir.geojson');
	obstLayer.addTo(myMap);
}

function length() {
	
	var line = {"type": "Feature",
	  		"properties": {
	  			"id": "ROAD1",
	  			"placeType": "road",
	  			"names": ["Patriot Cir","Patriot Circle"],
	  			"placeGroup": "NA",
		  		"placesWithin": [],
	  			"stroke": "#FF0000",
	  			"stroke-width": 3
	  				},
	  		"geometry": {"type":"MultiLineString","coordinates":[[[-77.30626733,38.82714288],[-77.30605352,38.8270535],[-77.30586901,38.826961],[-77.30561858,38.82682115],[-77.3053193092346,38.8266918638722]],[[-77.3110817674656,38.8269796034849],[-77.3109853409153,38.8270788556829],[-77.310942267369,38.8271360853397],[-77.3108922648735,38.8271877527648],[-77.3108597436469,38.8272437163116],[-77.3108447229482,38.8273026031874],[-77.310829072688,38.8273999277324],[-77.3108244488382,38.8274671552211],[-77.3108198738675,38.8275316426923]],[[-77.30394979,38.82756457],[-77.30424143,38.82709409],[-77.30427378,38.82704911],[-77.30429174,38.82702458],[-77.30437024,38.82694849],[-77.30444848,38.8268875],[-77.30453361,38.82683482],[-77.30462913,38.82679048],[-77.304728,38.82675579],[-77.30492182,38.82671108],[-77.30506256,38.82669192],[-77.3053193092346,38.8266929086542]],[[-77.3110817674656,38.8269796034849],[-77.310747153748,38.8272590514179],[-77.3103165185933,38.8276130401306],[-77.3101992125188,38.8277010960052],[-77.3100076515268,38.8278213508805]],[[-77.3078750239149,38.8277145803416],[-77.3065511049079,38.8272577246174],[-77.3062673339111,38.8271428844719]],[[-77.3100076515268,38.8278213508805],[-77.310078350679,38.8277918644598],[-77.3102126835895,38.8277355576264],[-77.3103045104366,38.8277021635172],[-77.3104105361103,38.8276593022537],[-77.3104707279426,38.8276283333413],[-77.3105801951162,38.8275896258148],[-77.3107388011458,38.8275514134191],[-77.3108198738675,38.8275316426923]],[[-77.3108198738675,38.8275316426923],[-77.310850459373,38.827592364695],[-77.3108843537699,38.8276654772318],[-77.3109325152898,38.8277250042982],[-77.3109841868246,38.8277845669059],[-77.3110604280107,38.8278443784095],[-77.3111642942929,38.8279319297444]],[[-77.3091108867614,38.8280085165833],[-77.3090637101171,38.8280094877297],[-77.3088848167818,38.8280008071563],[-77.3087621736901,38.8279872052928],[-77.308636206422,38.8279625855379],[-77.3083950875864,38.8278956064129],[-77.3078750239149,38.8277145803416]],[[-77.3095910667192,38.8279626641395],[-77.3097488093637,38.8279766211299],[-77.3098933996292,38.8279368974587],[-77.3100309016059,38.8279012207419],[-77.3101225012255,38.8278815572334],[-77.3102318552896,38.8278497111445],[-77.3103164349601,38.82782997357],[-77.310443133816,38.8278106628781],[-77.3105696733835,38.8278009641939],[-77.3107064734835,38.8278078398841],[-77.3108394383303,38.8278339013216],[-77.3109618087722,38.8278639742709],[-77.3111642942929,38.8279319297444]],[[-77.3095910667192,38.8279626641395],[-77.309802687236,38.8279030254614],[-77.3098804519809,38.8278708620669],[-77.3099475730888,38.8278454556983],[-77.3100076515268,38.8278213508805]],[[-77.3091108867614,38.8280085165833],[-77.3092428083779,38.8280058130919],[-77.309401006283,38.8279923151306],[-77.3095910667192,38.8279626641395]],[[-77.3033454193756,38.829671177635],[-77.3033413921509,38.8297032291323],[-77.3033078343583,38.8298209651681],[-77.3032550135573,38.8299686147069],[-77.3030758558084,38.8304694026366],[-77.3030526707498,38.8305968553909],[-77.3030412304759,38.8308617281473]],[[-77.3035715150244,38.8325322886155],[-77.3036948075232,38.8329333867968],[-77.3037383128545,38.8330615193735],[-77.3037789942693,38.8331484331065],[-77.3038678351815,38.8332948767106],[-77.3041350123836,38.8337820470327],[-77.3043296425761,38.8341167857171],[-77.3044592887166,38.8343464680423]],[[-77.3102345405229,38.833831902951],[-77.3103725540529,38.8337660222142],[-77.3105036832451,38.8336918390371],[-77.3105356163837,38.8336715676778],[-77.3106707102829,38.8335699617542],[-77.3107312672554,38.8335170284049],[-77.3107883891572,38.8334599412188],[-77.3108348858854,38.8334082383483],[-77.3109208814655,38.8333033886535],[-77.3109748985328,38.8332215559221]],[[-77.3084479285897,38.834231169998],[-77.3085566096278,38.8342405113268],[-77.3087636460201,38.8342467318788],[-77.3089006140844,38.8342440029916],[-77.3090940193675,38.8342253706243],[-77.3092841874926,38.8341902290982],[-77.3094287450012,38.8341532515957],[-77.3095558194239,38.8341119775866],[-77.3102345405229,38.833831902951]],[[-77.3067127514474,38.8340693730764],[-77.3072186213233,38.8341126922575]],[[-77.3072186213233,38.8341126922575],[-77.3073683454739,38.834125467597],[-77.3074418553716,38.8341385715596],[-77.3076346679718,38.8341556363258],[-77.3076978523784,38.8341562782239],[-77.3077364195266,38.83415941327],[-77.3084479285897,38.834231169998]],[[-77.3044592887166,38.8343464680423],[-77.3047024582207,38.8342697398357],[-77.3049664481635,38.834230298953],[-77.3054638838217,38.8341885524491],[-77.3067127514474,38.8340693730764]],[[-77.3114003441715,38.8313269897104],[-77.3113695605634,38.8312250923808],[-77.3113120147905,38.8308840054088],[-77.3113032117232,38.8307795681993],[-77.3113043707575,38.8307095569058],[-77.3113125534491,38.8306396167507],[-77.311355024037,38.8304066367882],[-77.3114041666653,38.8302025848508]],[[-77.3030412304759,38.8308617281473],[-77.3030760198286,38.8310913743216],[-77.3031022699251,38.8312014822039],[-77.3031654379781,38.8314135687175],[-77.3033408712567,38.8318409882236],[-77.303401399788,38.8320008735847]],[[-77.303401399788,38.8320008735847],[-77.3035518987996,38.8324500064874],[-77.3035715150244,38.8325322886155]],[[-77.3109748985328,38.8332215559221],[-77.3109893712622,38.8331956155471],[-77.3110365041714,38.8331054750439],[-77.3110806041257,38.8329864707976],[-77.3111448915168,38.832708403025],[-77.3111709663929,38.8326180491493],[-77.3112369415162,38.8324498384146],[-77.311316869555,38.8322872609598],[-77.3114218227503,38.8320974768871],[-77.3114730780673,38.8319703069416],[-77.311499489594,38.8318593613895],[-77.3115074414904,38.831803148906],[-77.3115084412842,38.8317427470186],[-77.3115096455791,38.8316699901985],[-77.3115001377252,38.8316081089003],[-77.3114836096494,38.831546156507],[-77.3114228135406,38.8314013757703],[-77.3114003441715,38.8313269897104]],[[-77.3039497916011,38.8275645653925],[-77.3035343717988,38.8282347107873],[-77.3034980827872,38.8283057369627],[-77.3034722778343,38.828379616025],[-77.3034346618876,38.8285302628193],[-77.3034284870185,38.8286138843858]],[[-77.3115093206501,38.8297807380639],[-77.3116603090407,38.8291424485632],[-77.3116759812726,38.8290437511762],[-77.3116803126429,38.8289943669934],[-77.3116860263127,38.8288612437352],[-77.3116835840852,38.8287966879499],[-77.3116776318804,38.8287320966226],[-77.3116581623031,38.8286357893902],[-77.3116213701109,38.8285255767275],[-77.3115842599507,38.8284345828482],[-77.3115365972758,38.828344855091],[-77.311485379318,38.8282578373084],[-77.3114339115328,38.8281859199862],[-77.3113650951016,38.8281014699117],[-77.3113133129072,38.8280487713684],[-77.3112267687257,38.8279751256553],[-77.3111642942929,38.8279319297444]],[[-77.3034284870185,38.8286138843858],[-77.3033575827588,38.8295743319809],[-77.3033454193756,38.829671177635]],[[-77.3115093206501,38.8297807380639],[-77.3114605771915,38.8299683455518],[-77.3114041666653,38.8302025848508]]]}};
	
	var length = turf.lineDistance(line, 'miles');
	console.log(length);


}