(async()=>{
  try {
    const js = await (await fetch('https://fehertoypeter.github.io/meteo-bookmarklet/codes.js')).text();
    eval(js);
    if(!window.codes){alert('codes.js nem hozott létre window.codes-t');return;}

    console.log('✅ codes.js betöltve, script elindítva');

    function clearDots(){document.querySelectorAll('.answer-dot').forEach(el=>el.remove());}
    function checkNumber(){
      const el=document.querySelector('.q-number');
      if(!el)return;
      const text=el.textContent.trim();
      const match=text.match(/No:\s*(\d+)/);
      if(!match)return;
      const number=match[1];
      clearDots();
      if(window.codes[number]){
        const correctLetter=window.codes[number];
        const li=[...document.querySelectorAll('.questionOptionList li')]
          .find(li=>li.querySelector('a')?.textContent.trim()===correctLetter);
        if(li){
          const dot=document.createElement('div');
          dot.className='answer-dot';
          Object.assign(dot.style,{
            position:'absolute',
            bottom:'5px',
            right:'5px',
            width:'8px',
            height:'8px',
            background:'#424242',
            borderRadius:'50%',
            zIndex:'9999'
          });
          li.style.position='relative';
          li.appendChild(dot);
        }
      }
    }

    if(!window._quizInterval){window._quizInterval=setInterval(checkNumber,1500);}

  } catch(e){
    alert('Nem sikerült betölteni a codes.js-t: '+e);
  }
})();
