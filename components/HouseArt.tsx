export default function HouseArt({ className = "" }: { className?: string }) {
  return <div className={`house-art ${className}`} aria-hidden="true">
    <div className="tree-canopy" /><div className="house-roof" /><div className="house-body"><div className="awning awning-one" /><div className="awning awning-two" /><div className="window window-one" /><div className="window window-two" /><div className="shop-front"><i /><i /><i /></div><div className="house-door" /></div>
    <div className="street-lamp"><i /></div><div className="hopscotch-art"><span>1</span><span>2</span><span>3</span><span>4</span></div><div className="cow-art"><i className="cow-body"/><i className="cow-head"/><i className="cow-leg leg-a"/><i className="cow-leg leg-b"/><i className="cow-spot spot-a"/><i className="cow-spot spot-b"/></div>
  </div>;
}
