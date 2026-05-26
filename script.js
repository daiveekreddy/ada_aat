function createInputs(){

let n=document.getElementById("examCount").value;

let div=document.getElementById("examInputs");

div.innerHTML="";

for(let i=0;i<n;i++){

div.innerHTML+=
`
Exam ${i}
<input id=e${i}>
<br><br>
`;

}
}

function greedyColoring(n,adj){

let result=new Array(n).fill(-1);

result[0]=0;

for(let u=1;u<n;u++){

let used=new Array(n).fill(false);

for(let v of adj[u]){

if(result[v]!=-1)
used[result[v]]=true;

}

let c=0;

while(used[c]) c++;

result[u]=c;

}

return result;
}

function drawGraph(){

let n=parseInt(
document.getElementById(
"examCount"
).value
);

let exams=[];

for(let i=0;i<n;i++){

exams.push(
document.getElementById(
`e${i}`
).value
);

}

let adj=[];

for(let i=0;i<n;i++)
adj.push([]);

let edges=[];

let lines=
document.getElementById(
"conflicts"
).value
.trim()
.split("\n");

for(let l of lines){

let p=l.split(" ");

let a=parseInt(p[0]);

let b=parseInt(p[1]);

adj[a].push(b);
adj[b].push(a);

edges.push([a,b]);

}

let colors=
[
"#ff4d4d",
"#4d79ff",
"#32cd32",
"#ff9900",
"#b84dff"
];

let result=
greedyColoring(
n,
adj
);

let graph=
document.getElementById(
"graph"
);

graph.innerHTML=
`
<svg id="svg"
width="100%"
height="100%">
</svg>
`;

let centerX=450;
let centerY=250;

let radius=180;

let pos=[];

for(let i=0;i<n;i++){

let angle=
2*Math.PI*i/n;

let x=
centerX+
radius*Math.cos(angle);

let y=
centerY+
radius*Math.sin(angle);

pos.push({x,y});

}

let svg=
document.getElementById(
"svg"
);

for(let e of edges){

svg.innerHTML+=
`
<line
x1="${pos[e[0]].x+40}"
y1="${pos[e[0]].y+40}"

x2="${pos[e[1]].x+40}"
y2="${pos[e[1]].y+40}"

stroke="black"
stroke-width="2"/>
`;

}

for(let i=0;i<n;i++){

let node=
document.createElement(
"div"
);

node.className="node";

node.innerText=
exams[i];

node.style.left=
pos[i].x+"px";

node.style.top=
pos[i].y+"px";

node.style.background=
colors[
result[i]
];

graph.appendChild(
node
);

}

let slotBox=
document.getElementById(
"slots"
);

slotBox.innerHTML=
"<h2>Schedule</h2>";

for(let i=0;i<n;i++){

slotBox.innerHTML+=
`
${exams[i]} → Slot ${result[i]+1}
<br>
`;

}
}