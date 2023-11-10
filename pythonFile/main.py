from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from the flask_cors extension
import google.generativeai as palm
import PyPDF2
import json
import pandas as pd

# dataset = pd.read_csv("C:/Users/DylanTan9818/Downloads/train.csv")
# dataset = dataset.drop(columns=["Unnamed: 0"])
# data = dataset.sample(frac=0.9, random_state=786).reset_index(drop=True)
# data_unseen = dataset.drop(data.index).reset_index(drop=True)
# exp_mclf101 = setup(data = data, target = 'health_index', session_id=123, ignore_features=['timestamp'])
# # compare_models()
# knn = create_model('dt')
# tuned_knn = tune_model(knn)
#
# final_knn = finalize_model(tuned_knn)
app = Flask(__name__)
CORS(app, resources = {r"/predict": {"origins": "http://localhost:3000"}})  # Enable CORS for the /predict route

@app.route('/predict', methods=['POST'])

def predict():
    try:
        count = 0
        out = ''
        palm.configure(api_key="AIzaSyBNNy1Kz7MvIeqaCwCfHQFEISKp1cXFr6Q")

        defaults = {
            'model': 'models/text-bison-001',
            'temperature': 1,
            'candidate_count': 1,
            'top_k': 40,
            'top_p': 0.95,
            'max_output_tokens': 1024,
            'stop_sequences': [],
        }
        prompt = """Familiarity with financial and banking products
        Demonstrated skills in good software engineering practices
        Building and shipping large-scale engineering products and/or infrastructure
        Scalable data architecture, fault-tolerant ETL, and monitoring data quality in the cloud (We use AWS)
        Deep expertise in data engineering and data processing at scale. Requires a focus on the development of pipelines for the creation of data lakes to enable exploration as well as machine learning model training, deployment and scoring at massive scale.
        NoSQL, Relational databases and Presto (We use MongoDB, MySQL, PostgreSQL, ElasticSearch)
        The AWS stack combined with technologies such as Java, Python, Spark, and Kafka\n"""

        new_prompt = ""
        # List of CVs
        pdf_files = ["cv2.pdf", "cv3.pdf", "cv4.pdf"]  # Replace with actual file paths

        # Process CVs
        candidates = []

        for pdf_file in pdf_files:
            with open(pdf_file, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                cv_text = ""
                for page in range(len(pdf_reader.pages)):
                    cv_text += pdf_reader.pages[page].extract_text() + " "

            count += 1

            # Analyze CV using spaCy
            prompt += "Resume {0}:".format(count) + "\n" + cv_text + "\n"
        prompt += """\n\nHighlight the skills of Resumes, Experience of Resumes with the Title, Company and Duration, Achievements of Resumes. Give Id between 1 and 9. Display the results in json format: 
        {
            "resume": [
                {
                    "id": '',
                    "skills": [],
                    "experience": [
                        "title": '',
                        "company": '',
                        "duration": '',
                    ],
                    "achievements": []
                },
            ],
        }
        """

        response = palm.generate_text(
            **defaults,
            prompt=prompt
        )

        if 'json' in response.result:
            out =response.result.replace('json', '')
        if '```' in response.result:
            out =out.replace('```', '')
        print(out)
        data = json.loads(out)
        return data
    except Exception as e:
        return jsonify({'error': str(e)})
# def predict():
#     try:
#         recommend = ''
#         data = request.get_json()
#         # Perform model prediction here using your loaded model
#         # Sample list
#         my_list = [data.get('carbon_monoxide')]
#         my_list1 = [data.get('co2')]
#         my_list2 = [data.get('humidity')]
#         my_list3 = [data.get('temperature')]
#         my_list4 = [data.get('pm25')]
#         my_list5 = [data.get('tvoc')]
#         if(my_list[0] > 10 or my_list1[0] > 1000):
#             recommend = recommend + "Improve ventilation for better air quality."
#         if(my_list2[0] < 40 or my_list2[0] > 70):
#             recommend += " Consider using a humidifier or Hygrometer to improve humidity levels."
#         if(my_list3[0] < 23 or my_list3[0] > 26):
#             recommend += "Consider adjusting indoor temperature levels"
#         if(my_list4[0] > 35):
#             recommend += "Consider using air purifier equipped with HEPA filters in indoor spaces"
#
#         # Create a DataFrame from the list
#         df = pd.DataFrame({'carbon_monoxide': my_list, 'co2': my_list1, 'humidity': my_list2, 'temperature': my_list3,
#                            'pm25': my_list4, 'tvoc': my_list5})
#         test_predict = predict_model(final_knn, data=df)
#
#         return jsonify({'prediction': test_predict['prediction_label'][0],'score': test_predict['prediction_score'][0], 'recommendation': recommend})
#
#     except Exception as e:
#         return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run()
