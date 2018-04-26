import time
import datetime
import psutil
import boto3
import decimal
import numpy  as np

CONTEXT = decimal.Context(prec=3)

def poll(n=10, interval=1):
    loads = []
    for _ in range(n):
        loads.append(psutil.cpu_percent(percpu=True))
        time.sleep(interval)
    stds = [CONTEXT.create_decimal_from_float(x) for x in np.std(loads, axis=0)]
    medians = [CONTEXT.create_decimal_from_float(x) for x in np.median(loads, axis=0)]
    return {'medians': medians, 'stds': stds}

def update():
    timestamp = datetime.datetime.utcnow().isoformat()    
    cpu_loads = poll()
    return {'id':'10s', 'timestamp': timestamp, 'cpu_loads': cpu_loads}

def main():
    n = 1
    session = boto3.session.Session(profile_name='logstuff')
    db = session.resource('dynamodb')
    table = db.Table('logstuff')

    while True:
        print(n)
        item = update()
        print(item)
        try:
            response = table.put_item(Item=item)
            if response['ResponseMetadata']['HTTPStatusCode'] != 200:
                print('Bad Respones: %s' % response)
        except Exception as e:
            print(e)
        time.sleep(1)
        n += 1

if __name__ == "__main__":
    main()