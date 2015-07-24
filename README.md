<h1><a href="http://codepen.io/clearwavedesigns/pen/gbOrvR" target="_blank">FlagstoneJS</a></h1>
<h2>"Responsive Tiling"</h2>
<p>Current Version: <strong>1.3.20150723</strong></p>
<h3>Responsively positions HTML elements left or right and top to bottom regardless of content size.</h3>
<p><a href="http://codepen.io/clearwavedesigns/pen/QbVLgQ" target="_blank">Live demo</a> (No dependencies with CSS-only animation)</p>
<p><a href="http://codepen.io/clearwavedesigns/pen/gbOrvR" target="_blank">Live demo</a> (jQuery dependent with optional jQuery animation instead of default CSS animation)</p>

<small>COPYRIGHT (C) 2014-2015 by CLEARWAVE DESIGNS, LLC.  All rights reserved.</small>

<ul>
  <li>Name (official): FlagstoneJS</li>
  <li>Names (alternative): Flagstone or flagstone.js</li>
  <li>Slogan: "Responsive tiling."</li>
</ul>

<article>
  <h3>HTML</h3>
  <p>This example shows the default selectors as attributes, but <em>any</em> selector can be used on any HTML structure:</p>
  <p>&lt;ul flagstones&gt;</p>
    <p>&#160;&#160;&lt;li flagstone&gt;...[content of all types here]...&lt;/li&gt;</p>
    <p>&#160;&#160;&lt;li flagstone&gt;...[content of all types here]...&lt;/li&gt;</p>
    <p>&#160;&#160;&lt;li flagstone&gt;...[content of all types here]...&lt;/li&gt;</p>
    <p>&#160;&#160;&lt;li flagstone&gt;...[content of all types here]...&lt;/li&gt;</p>
    <p>&#160;&#160;&lt;li flagstone&gt;...[content of all types here]...&lt;/li&gt;</p>
  <p>&lt;/ul&gt;</p>
</article>

<article>
  <h3>JavaScript</h3>
  <p>Initialize a Flagstone instance and pass in the <em>optional</em> properties</p>
  <code>
   <p><strong>var fs = new FLAGSTONE();</strong></p>
   <p>OR</p>
    <p><strong>var fs = new FLAGSTONE({</strong></p>
      <p><strong>&#160;&#160;area: '.js-floor',</strong> <em>// Wrapping element (as a selector string)</em></p>
      <p><strong>&#160;&#160;areaMargin: 10,</strong> <em>// The padding around the area edge in pixels (as an int)</em></p>
      <p><strong>&#160;&#160;flagstones: '.js-tile',</strong> <em>// Tilable elements (as a selector string)</em></p>
      <p><strong>&#160;&#160;flagstonesMargin: 10,</strong> <em>// Margin between flagstones in pixels (as an int)</em></p>
      <p><strong>&#160;&#160;minWidth: 300,</strong> <em>// Minimum width you want the tilable elements (pixels as int)</em></p>
      <p><strong>&#160;&#160;maxColumns: 2,</strong> <em> // Maximum number of columns to display (as an int)
      <p><strong>&#160;&#160;margin: 10,</strong> <em>// This overrides areaMargin & flagstoneMargin and is equivalent to setting them both to this value</em></p>
      <p><strong>&#160;&#160;direction: 'left',</strong> <em>// Alternative is "right"; the default is "left"; and for top to bottom, use CSS's built in Columns or Flexbox</em></p>
      <p><strong>&#160;&#160;duration: 2000,</strong> <em>// Animation duration, or 0 for none (milliseconds as an int)</em></p>
      <p><strong>&#160;&#160;jqueryAnimation: false,</strong> <em>// If true, jQuery animation will be used instead of CSS animation; but it's very slow! (as a boolean)</em></p>
      <p><strong>&#160;&#160;resizeDelay: 250</strong> <em>// Delay running the reset function while resizing the window  (milliseconds as an int)</em></p>
    <p><strong>});</strong></p>
  </code>
</article>

<article>
  <h3>Reset Options (for dynamic content and/or media content)</h3>
  <p><em>Soft reset: <strong>fs.reset();</strong></em> // Simple and quick reset. This is ideal for when one or more flagstone's content grows after the initial run.</p>
  <p><em>Hard reset: <strong>fs.hardReset();</strong></em> // For dynamically added/removed flagstones. This requires all elements to be re-referenced and re-calculated.</p>
  
  <p>NOTE: The jQuery "load" event is used to delay the initial calculations if there are images, iframes, objects, embeds, videos or audio. If ng-src is used via AngularJS, you will need to provide a load directive and call the soft reset on the callback.</p>
</article>
