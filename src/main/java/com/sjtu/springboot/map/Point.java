package com.sjtu.springboot.map;

public class Point {
    int px;
    int py;
    boolean visited;
    int prepoint;

    public Point(int px, int py, int pre) {
        this.px = px;
        this.py = py;
        this.visited = false;
        this.prepoint=pre;
    }

    public int getLength(Point p){
        return Math.abs(px - p.px) + Math.abs(py - p.py);
    }
}
