from flask import Flask
from flask_cors import CORS
import json
import numpy as np
app = Flask(__name__)
CORS(app)
from flask import Flask, g, request, jsonify, url_for
import requests
app = Flask(__name__)
CORS(app)
api_path = "/api"



@app.route(f"{api_path}/hello", methods=["POST"])
def say_hello_world():
    weight =  request.get_json(force=True).get("weight")
    print(weight)
    with open('data.json') as f: 
        data = f.read() 
    # reconstructing the data as a dictionary 
    data = json.loads(data) 
    contour_mean=np.array(data["contour_mean"])
    contour_std=np.array(data["contour_std"])
    target_historic = np.array(data["latent_historic_interp"])
    target = np.array(data["target_historic_interp"])
    #original
    result=(1-weight)*contour_std+weight*contour_mean
    #Sharp's ratio
    # result=((1-weight)*contour_std)/(weight*contour_mean)
    F=result.reshape(-1,1).tolist()
    npnts = 100
    x = np.linspace(0,1,npnts)
    x1, x2 = np.meshgrid(x,x) 
    data2 = []
    k=0

    for i in range(0,100):
        for j in range(0,100):
            datasmall = [None]*6
            datasmall[0]=round(x1[i,j],5)
            datasmall[1]=round(x2[i,j],5)
            datasmall[2]=round(F[k][0],5)
            if(k<len(target)):
                datasmall[3]=target_historic[k][0]
                datasmall[4]=target_historic[k][1]   
                datasmall[5]=target[k] 
            k+=1
            data2.append(datasmall)
    return(json.dumps(data2))



import matplotlib.pyplot as plt
with open('data.json') as f: 
    data = f.read() 
data = json.loads(data)

contour_mean = np.array(data["contour_mean"])
contour_std  = np.array(data["contour_std"])
target_historic = np.array(data["latent_historic_interp"])

npnts = 100
x = np.linspace(0,1,npnts)
x1, x2 = np.meshgrid(x,x) 

plt.figure()
plt.contour(x1, x2, contour_mean, 30)
plt.plot(target_historic[:,0], target_historic[:,1], '.', color='black')

plt.figure()
plt.contour(x1, x2, contour_std, 30)
plt.plot(target_historic[:,0], target_historic[:,1], '.', color='black')

contour_mean = np.reshape(contour_mean,[-1,1])
contour_std = np.reshape(contour_std,[-1,1])

plt.figure()
plt.plot(contour_mean, contour_std, '.', color='red')
plt.xlabel('reward')
plt.ylabel('risk')



plt.show()














































