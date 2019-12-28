package com.sjtu.springboot.map;

import java.util.Stack;

public class ShortestPath {

    static int minpath = Integer.MAX_VALUE;
    static Stack<Integer> solution = new Stack<Integer>();
    static Object bestsolution = new Stack<>();

    public static int calculate(Point start, Point end, Point[] points, int sum, int count){
        if(count == points.length){
            if(sum+end.getLength(start)<minpath){
                minpath=sum+end.getLength(start);
                bestsolution=solution.clone();
            }

            return minpath;
        }
        for(int i = 0; i<points.length; i++){
            if(((points[i].prepoint<0)||(points[i].prepoint>=0 && points[points[i].prepoint].visited==true)) && points[i].visited == false){
                sum += points[i].getLength(start);
                if(sum < minpath){
                    points[i].visited = true;
                    solution.push(i);
                    calculate(points[i], end, points, sum, count+1);
                    solution.pop();
                }
                sum -= points[i].getLength(start);
                points[i].visited = false;
            }
        }

        // or return
        System.out.println(bestsolution);

        return minpath;
    }

    public static void main(String[] args){
        int pnum = 9;

        Point[] points = new Point[pnum];
        points[0] = new Point(49049,28848,-1);
        points[1]=new Point(46122,27897,-1);
        points[2]=new Point(38792,41221,1);
        points[3]=new Point(43157,29285,-1);
        points[4]=new Point(29463,40808,3);
        points[5]=new Point(38612,23692,-1);
        points[6]=new Point(29229,35528,5);
        points[7]=new Point(25703,10868,-1);
        points[8]=new Point(24113,32302,7);
        Point START = new Point(49049,28848,-1);
        Point END = new Point(0,0,-1);
        int min = calculate(START, END, points, 0, 0);
        System.out.println(min);
    }

}
