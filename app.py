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
import matplotlib.pyplot as plt


@app.route(f"{api_path}/heatmap", methods=["POST"])
def heatMap():
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




@app.route(f"{api_path}/scatter", methods=["GET"])
def scatter():
    with open('dataDecisions.json') as f: 
        data = f.read() 
    data = json.loads(data)

    contour_mean = (np.array(data["contour_mean"]).reshape(-1,1)).tolist()
    contour_std  = (np.array(data["contour_std"]).reshape(-1,1)).tolist()
  
    reward_actual= np.array(data["target_historic_interp_predicted_mean"])
    risk_pred =  np.array(data["target_historic_interp_predicted_std"])

    data2 = []
    # Sample data points
    for i in range(0,len(contour_mean)):
        new = {
            "plotType":"Samples",
            "Reward": round(contour_mean[i][0],5),
            "Risk": round(contour_std[i][0],5)
        }
        data2.append(new)
    # Historical predictions
    for i in range(0,len(reward_actual)):
        new = {
            "plotType":"Historic Prediction",
            "Reward": round(reward_actual[i][0],5),
            "Risk": round(risk_pred[i][0],5)
        }
        data2.append(new)         
    # Decisions
    k=1
    for i in range(np.shape(data["decisions_reward"])[0]):
        reward = data["decisions_reward"][i]
        risk = data["decisions_risk"][i]
        for j in range(len(reward)):
            new = {
                "plotType":"Decisions"+str(k),
                "Reward": round(reward[j],5),
                "Risk": round(risk[j],5)
            }
            data2.append(new) 
        k=k+1

    return(json.dumps(data2))

@app.route(f"{api_path}/radar", methods=["GET"])
def radarMean():
    with open('data_sensitivity.json') as f: 
        data = f.read() 
    data = json.loads(data)

    sens_list = np.array(data["ordered_label_list"])
    sens_mean  = np.array(data["sensitivity_result_mean"])
    sens_std = np.array(data["sensitivity_result_std"])
    minMean = min(sens_mean)
    minIndex =np.where(sens_std==sens_std.min())
    maxMean = max(sens_mean)
    maxIndex =np.where(sens_std==sens_std.max())
    minVal = round(minMean-sens_std[minIndex][0]-.03,5)
    maxVal = round(maxMean+sens_std[maxIndex][0],5)
    print(minVal)
    data2 = []
    data2.append(minVal)
    data2.append(maxVal)
    dataMean=[]
    dataMeanPlusDev=[]
    dataMeanMinusDev=[]
    for i in range(0,len(sens_mean)):
        new = {
            "item":sens_list[i],
            "Mean": round(sens_mean[i],5),
        }
        dataMean.append(new)
    data2.append(dataMean)
   
    for i in range(0,len(sens_mean)):
        new = {
            "item":sens_list[i],
            "Mean+Deviation":  round(sens_mean[i]+sens_std[i],5),
        }
        dataMeanPlusDev.append(new)
    data2.append(dataMeanPlusDev)
    for i in range(0,len(sens_mean)):
        new = {
            "item":sens_list[i],
            "Mean-Deviation": round(sens_mean[i]-sens_std[i],5)
        }
        dataMeanMinusDev.append(new)
    data2.append(dataMeanMinusDev)
    return(json.dumps(data2))

# with open('data.json') as f: 
#     data = f.read() 
# data = json.loads(data)

# contour_mean = np.array(data["contour_mean"])
# contour_std  = np.array(data["contour_std"])
# target_historic = np.array(data["latent_historic_interp"])

# npnts = 100
# x = np.linspace(0,1,npnts)
# x1, x2 = np.meshgrid(x,x) 

# plt.figure()
# plt.contour(x1, x2, contour_mean, 30)
# plt.plot(target_historic[:,0], target_historic[:,1], '.', color='black')

# plt.figure()
# plt.contour(x1, x2, contour_std, 30)
# plt.plot(target_historic[:,0], target_historic[:,1], '.', color='black')

# contour_mean = np.reshape(contour_mean,[-1,1])
# contour_std = np.reshape(contour_std,[-1,1])

# plt.figure()
# plt.plot(contour_mean, contour_std, '.', color='red')
# plt.xlabel('reward')
# plt.ylabel('risk')



# plt.show()














































