<template>
    <div>
        <button @click="generateChart">테마정보</button>
        <div id='arc' ref="chart"></div>
    </div>
</template>

<script>
import * as d3 from "d3";
// import mdata from "@/data/medical.json";
import { mapGetters} from 'vuex';

export default {
    name: 'MedicalChart',
    data() {
        return {
            gdp: [
                {country: "USA", value: 20.5 },
                {country: "China", value: 13.4 },
                {country: "Germany", value: 4.0 },
                {country: "Japan", value: 4.9 },
                {country: "France", value: 2.8 }
            ],
            childData: [
                10, 20, 30, 40, 50
            ]
        };
    },
    mounted() {
        // this.generateArc();
        // this.generateChart();
    },
    computed: {
        ...mapGetters([
            'themeData',
        ]),
    },
    methods: {
        generateChart(){
            this.$refs.chart.innerHTML = "";

            const pack = data => d3.pack()
                    .size([width, height])
                    .padding(20)
                    (d3.hierarchy(data)
                    .sum(d => d.value)
                    .sort((a, b) => b.value - a.value));
            const data = this.themeData;
            const width = 932;
            const height = width;
            const color = d3.scaleLinear()
                            .domain([0, 5])
                            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
                            .interpolate(d3.interpolateHcl);

            const root = pack(data);
            let focus = root;
            let view;

            // <svg> element 생성
            let svg = d3
                .select("#arc")
                .append("svg")
                .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
                .style("display", "block")
                .style("margin", "0px")
                .style("background", color(0))
                .style("cursor", "pointer")
                .on("click", (event) => zoom(event, root));

            const node = svg.append("g")
                .selectAll("circle")
                .data(root.descendants().slice(1))
                .join("circle")
                .attr("fill", d => d.children ? color(d.depth) : "white")
                .attr("pointer-events", d => !d.children ? "none" : null)
                .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
                .on("mouseout", function() { d3.select(this).attr("stroke", null); })
                .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

            const label = svg.append("g")
                .style("font", "35px sans-serif")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .selectAll("text")
                .data(root.descendants())
                .join("text")
                .style("fill-opacity", d => d.parent === root ? 1 : 0)
                .style("display", d => d.parent === root ? "inline" : "none")
                .text(d => d.data.이름);

            zoomTo([root.x, root.y, root.r * 2]);

            function zoomTo(v) {
                const k = width / v[2];

                view = v;

                label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
                node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
                node.attr("r", d => d.r * k);
            }

            function zoom(event, d) {
                const focus0 = focus;

                focus = d;

                const transition = svg.transition()
                    .duration(event.altKey ? 7500 : 750)
                    .tween("zoom", d => {
                    const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                    return t => zoomTo(i(t));
                    });

                label
                .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .transition(transition)
                    .style("fill-opacity", d => d.parent === focus ? 1 : 0)
                    .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                    .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
            }

            
        },
        generateArc() {
            // 데이터 가공, 변수 선언
            const svgWidth = 250;
            const svgHeight = svgWidth;
            const innerRadius = svgWidth / 10;
            const outerRadius = svgWidth / 2;
            const middleRadius = (innerRadius + outerRadius) / 2;
            const sortedGDP = this.gdp.sort((a, b) => (a.value > b.value ? 1 : -1));
            const sGdpValues = sortedGDP.map(d => d['value']);
            const sumGDP = this.gdp.map(d => d['value']).reduce((a,b)=>a+b)
            const sumTest = this.childData.reduce((a,b) => a+b)
            const color = d3.scaleOrdinal(d3.schemeDark2);
            // <svg> element 생성
            let svg = d3
                .select("#arc")
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight);

            // 스케일 설정 (실제 값 <-> 화면에 보여지기 위한 값)
            const angleScale = d3
                .scaleLinear()
                .domain([0, sumGDP])
                .range([0, 2 * Math.PI]);

            const childAngleScale = d3
                .scaleLinear()
                .domain([0, sumTest])
                .range([angleScale(sGdpValues.slice(0,4).reduce((a,b)=> a+b)), angleScale(sGdpValues.slice(0,5).reduce((a,b)=> a+b))]);

            // 도넛 그리기
            const arc = d3
                .arc()
                .innerRadius(innerRadius)
                .outerRadius(middleRadius)
                .startAngle((d,i) => i != 0 ? angleScale(sGdpValues.slice(0,i).reduce((a,b)=> a+b)) : 0)
                .endAngle((d,i) => angleScale(sGdpValues.slice(0,i+1).reduce((a,b)=> a+b)));

            const childArc = d3
                .arc()
                .innerRadius(middleRadius)
                .outerRadius(outerRadius)
                .startAngle((d,i) => i != 0 ? childAngleScale(this.childData.slice(0,i).reduce((a,b)=>a+b)) : angleScale(sGdpValues.slice(0,4).reduce((a,b)=>a+b)))
                .endAngle((d,i) => childAngleScale(this.childData.slice(0,i+1).reduce((a,b)=> a+b)));

            // 데이터 연결
            const g = svg.append("g");
            g.selectAll("path")
                .data(sortedGDP)
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("fill", (d, i) => color(i))
                .attr("stroke", "#fff")
                .attr("stroke-width", "2px")
            // event
                .on("mouseenter", function() {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("opacity", 0.5);
                })
                .on("mouseout", function() {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr("opacity", 1);
                })

            const g2 = svg.append("g");
            g2.selectAll("path")
                .data(this.childData)
                .enter()
                .append("path")
                .attr("d", childArc)
                .attr("fill", (d, i) => color(i))
                .attr("stroke", "#fff")
                .attr("stroke-width", "2px")
                .attr('transform',(d,i) => `translate(0,10*${i})`)
            // 올바른 위치로 이동
            g.attr("transform", `translate(${svgWidth/2},${svgHeight/2})`);
            g2.attr("transform", `translate(${svgWidth/2},${svgHeight/2})`);
        }
    }
}
</script>
<style>

</style>