import React from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import './styles.css';

const rootElement=document.getElementById('root');
const root=createRoot(rootElement);

const Loading=()=>(
  <div className="center">
    <div className="panel" style={{maxWidth:520,margin:24,textAlign:'center'}}>
      <div className="brand">Gesti<span>Pro</span></div>
      <p style={{color:'#64748b'}}>Chargement de votre espace…</p>
    </div>
  </div>
);

class AppErrorBoundary extends React.Component{
  constructor(props){super(props);this.state={error:null}}
  static getDerivedStateFromError(error){return {error}}
  componentDidCatch(error,info){console.error('GestiPro render error',error,info)}
  render(){
    if(this.state.error){
      return <div className="center"><div className="panel" style={{maxWidth:650,margin:24}}>
        <h2>GestiPro — erreur de chargement</h2>
        <p style={{color:'#64748b',lineHeight:1.6}}>{this.state.error.message||'Une erreur JavaScript empêche l’application de démarrer.'}</p>
        <button className="primary" onClick={()=>window.location.reload()}>Actualiser</button>
      </div></div>
    }
    return this.props.children;
  }
}

root.render(<Loading/>);

import('./App').then(({default:App})=>{
  root.render(
    <HashRouter>
      <AppErrorBoundary><App/></AppErrorBoundary>
    </HashRouter>
  );
}).catch(error=>{
  console.error('GestiPro boot error',error);
  root.render(
    <div className="center"><div className="panel" style={{maxWidth:650,margin:24}}>
      <h2>GestiPro — impossible de charger</h2>
      <p style={{color:'#64748b',lineHeight:1.6}}>{error?.message||'Erreur JavaScript au démarrage.'}</p>
      <button className="primary" onClick={()=>window.location.reload()}>Actualiser</button>
    </div></div>
  );
});
