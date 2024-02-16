import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { saveCodeToLocalStorage } from '../../services/LocalStorage/LocalCodeSaving'
import { SettingContext } from '../../context/SettingsContext'

type Props = {}
const ExamplesData=[
    {
        title:"Pandas read_csv",
        description:"Read a CSV file using Pandas library from online url, and display the first 5 rows of the dataframe.",
        image:"/images/examples/pandas_read_csv.png",
        code:`import requests
import pandas
import io
content=requests.get("https://gist.githubusercontent.com/rnirmal/e01acfdaf54a6f9b24e91ba4cae63518/raw/6b589a5c5a851711e20c5eb28f9d54742d1fe2dc/datasets.csv").text
data=pandas.read_csv(io.StringIO(content))
print(data.head())`
    },
    {
        title:"Matplotlib Line Plot",
        description:"Plot a simple line plot using Matplotlib library in Python.",
        image:"/images/examples/matplotlib_plot.png",
        code:`import matplotlib.pyplot as pyplot
x=[x for x in range(100)]
y=[y for y in range(100,0,-1)]
pyplot.plot(x,y)
pyplot.show()`
    },
    {
        title:"Numpy Statistics",
        description:"Calculate mean, median, mode, standard deviation using Numpy library in Python.",
        image:"/images/examples/numpy_statistics.png",
        code:`import numpy
data = numpy.array([1, 2, 3, 4, 5])
# Calculate the mean
mean = numpy.mean(data)
# Calculate the median
median = numpy.median(data)
# Calculate the standard deviation
standard_deviation = numpy.std(data)
# Print the results
print("Mean:", mean)
print("Median:", median)
print("Standard deviation:", standard_deviation)`
    },
    {
        title:"Pandas Multivariate Plot",
        description:"Plot a multivariate plot using Pandas and matplotlib library in Python.",
        image:"/images/examples/pandas_multivariable_plot.png",
        code:`import requests
import pandas
import io
import matplotlib.pyplot as pyplot
content=requests.get("https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv").text
data=pandas.read_csv(io.StringIO(content))
print(data.head())
data.plot()
pyplot.show()`
    },
    {
        title:"Box Plot using pandas and matplotlib",
        description:"Generate a box plot using Pandas and Matplotlib library in Python.",
        image:"/images/examples/box_plot.png",
        code:`import requests
import pandas
import io
import matplotlib.pyplot as pyplot
content=requests.get("https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv").text
data=pandas.read_csv(io.StringIO(content))
data.boxplot()
pyplot.show()`
    },
    {
        title:"Normal data distribution and histogram using Numpy and Matplotlib",
        description:"Generate a normal data distribution and histogram using Numpy and Matplotlib library in Python.",
        image:"/images/examples/normal_data_histogram.png",
        code:`import numpy
import matplotlib.pyplot as plt

x = numpy.random.normal(5.0, 1.0, 100000)

plt.hist(x, 100)
plt.show()`
    },
    {
        title:"Pie Chart using Matplotlib",
        description:"Generate a pie chart using Matplotlib library in Python",
        image:"/images/examples/pie_chart.png",
        code:`import matplotlib.pyplot as plt
import numpy as np

y = np.array([35, 25, 25, 15])
mylabels = ["Apples", "Bananas", "Cherries", "Dates"]
myexplode = [0.2, 0, 0, 0]

plt.pie(y, labels = mylabels, explode = myexplode)
plt.show() `
    },
    {
        title:"Classification Report using Scikit-learn",
        description:"Generate a classification report using Scikit-learn library in Python.",
        image:"/images/examples/classification_report.png",
        code:`import numpy as np
from sklearn.metrics import confusion_matrix

actual = np.array(['Dog','Dog','Dog','Not Dog','Dog','Not Dog','Dog','Dog','Not Dog','Not Dog'])
predicted = np.array(['Dog','Not Dog','Dog','Not Dog','Dog','Dog','Dog','Dog','Not Dog','Not Dog'])
print(classification_report(actual, predicted))`
    },
    {
        title:"Confusion Matrix using Scikit-learn",
        description:"Generate a confusion matrix using Scikit-learn library in Python.",
        image:"/images/examples/confusion_matrix.png",
        code:`import matplotlib.pyplot as plt
import numpy
from sklearn import metrics

actual = numpy.random.binomial(1,.9,size = 1000)
predicted = numpy.random.binomial(1,.9,size = 1000)

confusion_matrix = metrics.confusion_matrix(actual, predicted)

cm_display = metrics.ConfusionMatrixDisplay(confusion_matrix = confusion_matrix, display_labels = [False, True])

cm_display.plot()
plt.show()`
    },
    {
        title:"Linear Regression using Statsmodels",
        description:"Perform linear regression using Statsmodels library in Python.",
        image:"/images/examples/linear_regression.png",
        code:`import matplotlib.pyplot as plt
from scipy import stats

x = [5,7,8,7,2,17,2,9,4,11,12,9,6]
y = [99,86,87,88,111,86,103,87,94,78,77,85,86]

slope, intercept, r, p, std_err = stats.linregress(x, y)

def myfunc(x):
    return slope * x + intercept

mymodel = list(map(myfunc, x))

plt.scatter(x, y)
plt.plot(x, mymodel)
plt.show()`
    },
    {
        title:"K-Means Clustering using Scikit-learn",
        description:"Perform K-Means clustering using Scikit-learn library in Python.",
        image:"/images/examples/k_means.png",
        code:`from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
x = [4, 5, 10, 4, 3, 11, 14 , 6, 10, 12]
y = [21, 19, 24, 17, 16, 25, 24, 22, 21, 21]

data = list(zip(x, y))
kmeans = KMeans(n_clusters=2)
kmeans.fit(data)

plt.scatter(x, y, c=kmeans.labels_)
plt.show()`
    },
    {
        title:"Matplotlib Bar Plot",
        description:"Plot a simple bar plot using Matplotlib library in Python.",
        image:"/images/examples/matplotlib_bar_chart.png",
        code:`import matplotlib.pyplot as plt
import numpy as np

species = ("Adelie", "Chinstrap", "Gentoo")
penguin_means = {
    'Bill Depth': (18.35, 18.43, 14.98),
    'Bill Length': (38.79, 48.83, 47.50),
    'Flipper Length': (189.95, 195.82, 217.19),
}

x = np.arange(len(species))  # the label locations
width = 0.25  # the width of the bars
multiplier = 0

fig, ax = plt.subplots(layout='constrained')

for attribute, measurement in penguin_means.items():
    offset = width * multiplier
    rects = ax.bar(x + offset, measurement, width, label=attribute)
    ax.bar_label(rects, padding=3)
    multiplier += 1

# Add some text for labels, title and custom x-axis tick labels, etc.
ax.set_ylabel('Length (mm)')
ax.set_title('Penguin attributes by species')
ax.set_xticks(x + width, species)
ax.legend(loc='upper left')
ax.set_ylim(0, 250)

plt.show()`
    },
    {
        title:"Matplotlib multiple subplots",
        description:"Plot multiple subplots using Matplotlib library in Python.",
        image:"/images/examples/matplotlib_multi_plot_output.png",
        code:`import matplotlib.pyplot as plt
import numpy as np

# define a list of markevery cases to plot
cases = [
    None,
    8,
    (30, 8),
    [16, 24, 32],
    [0, -1],
    slice(100, 200, 3),
    0.1,
    0.4,
    (0.2, 0.4)
]

# data points
delta = 0.11
x = np.linspace(0, 10 - 2 * delta, 200) + delta
y = np.sin(x) + 1.0 + delta
fig, axs = plt.subplots(3, 3, figsize=(10, 6), layout='constrained')
for ax, markevery in zip(axs.flat, cases):
    ax.set_title(f'markevery={markevery}')
    ax.plot(x, y, 'o', ls='-', ms=4, markevery=markevery)
pyplot.show()`
    },
    {
        title:"Numpy Random Image Generation",
        description:"Generate a random image using Numpy library in Python.",
        image:"/images/examples/numpy_random_image.png",
        code:`import numpy as np
import matplotlib.pyplot as plt

image_array = np.random.randint(low=0, high=255,size=(250,250,3),dtype=np.uint8)
plt.imshow(image_array)
plt.show()`
    },
    {
        title:"Scipy Function Optimization",
        description:"Optimize a function using Scipy library in Python.",
        image:"/images/examples/scipy_function_minimization.png",
        code:`import scipy.optimize as opt
# Define a function to minimize
def function(x):
    return x**2 + 2*x + 1
# Use the minimize function to find the minimum value of the function
result = opt.minimize(function, x0=0)
# Print the results
print("Minimum value:", result.x)`
    },
    {
        title:"Turtle Flower",
        description:"Draw a flower using Turtle library in Python.",
        image:"/images/examples/turtle_flower.png",
        code:`import turtle
turtle.penup()
turtle.left(90)
turtle.fd(200)
turtle.pendown()
turtle.right(90)
turtle.fillcolor("red")
turtle.begin_fill()
turtle.circle(10, 180)
turtle.circle(25, 110)
turtle.left(50)
turtle.circle(60, 45)
turtle.circle(20, 170)
turtle.right(24)
turtle.fd(30)
turtle.left(10)
turtle.circle(30, 110)
turtle.fd(20)
turtle.left(40)
turtle.circle(90, 70)
turtle.circle(30, 150)
turtle.right(30)
turtle.fd(15)
turtle.circle(80, 90)
turtle.left(15)
turtle.fd(45)
turtle.right(165)
turtle.fd(20)
turtle.left(155)
turtle.circle(150, 80)
turtle.left(50)
turtle.circle(150, 90)
turtle.end_fill()
turtle.left(150)
turtle.circle(-90, 70)
turtle.left(20)
turtle.circle(75, 105)
turtle.setheading(60)
turtle.circle(80, 98)
turtle.circle(-90, 40)
turtle.left(180)
turtle.circle(90, 40)
turtle.circle(-80, 98)
turtle.setheading(-83)
turtle.fd(30)
turtle.left(90)
turtle.fd(25)
turtle.left(45)
turtle.fillcolor("green")
turtle.begin_fill()
turtle.circle(-80, 90)
turtle.right(90)
turtle.circle(-80, 90)
turtle.end_fill()
turtle.right(135)
turtle.fd(60)
turtle.left(180)
turtle.fd(85)
turtle.left(90)
turtle.fd(80)
turtle.right(90)
turtle.right(45)
turtle.fillcolor("green")
turtle.begin_fill()
turtle.circle(80, 90)
turtle.left(90)
turtle.circle(80, 90)
turtle.end_fill()
turtle.left(135)
turtle.fd(60)
turtle.left(180)
turtle.fd(60)
turtle.right(90)
turtle.circle(200, 60)
turtle.done()
        `
    },

]

function Examples({ }: Props) {
    const { settings } = useContext(SettingContext)
    return (
        <div>
            <Container>
                <Typography variant="h4" component="div" textAlign={'center'}>
                    Examples
                </Typography>

                <Typography component={'div'} sx={{
                    display: settings.screen === "mobile" ? "flex" : "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                    flexWrap: "wrap"
                }}>
                    {
                        ExamplesData.map((example, index) => {
                            return (
                                <Card sx={{ maxWidth: 345 }} key={index}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={example.image}
                                            alt={example.title}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {example.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {example.description}

                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button variant='outlined' size="small" onClick={()=>{
                                            navigator.clipboard.writeText(example.code)
                                            saveCodeToLocalStorage(example.code as string)
                                            window.location.href="/ide"
                                        }}>
                                            Open
                                        </Button>
                                    </CardActions>
                                </Card>
                            )
                        })
                    }



                </Typography>

















            </Container>
        </div>
    )
}

export default Examples