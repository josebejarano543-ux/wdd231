using System;

public static class Arrays
{
    public static double[] MultiplesOf(double start, int count)
    {
        // Create an array to store the multiples
        double[] result = new double[count];

        // Loop through the array
        for (int i = 0; i < count; i++)
        {
            // Store the multiple
            result[i] = start * (i + 1);
        }

        // Return the array
        return result;
    }
}